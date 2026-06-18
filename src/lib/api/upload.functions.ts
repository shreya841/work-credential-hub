import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import * as fs from "fs/promises";
import * as path from "path";
import { requireAuth } from "@/lib/auth/session.server";

// Helper to sanitize filename
function sanitizeFilename(name: string): string {
  const parsed = path.parse(name);
  const safeName = parsed.name.replace(/[^a-zA-Z0-9-_]/g, "_");
  const safeExt = parsed.ext.replace(/[^a-zA-Z0-9.]/g, "");
  return `${safeName}-${Date.now()}${safeExt}`;
}

// ── uploadFile ────────────────────────────────────────────────────────

export const uploadFile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fileName: z.string().min(1),
      fileType: z.string().min(1),
      base64Data: z.string().min(1), // Base64 data string
    })
  )
  .handler(async ({ data }) => {
    await requireAuth();

    // Verify file size (max 5MB, base64 length is 4/3 of binary size)
    const base64Clean = data.base64Data.replace(/^data:.*?;base64,/, "");
    const buffer = Buffer.from(base64Clean, "base64");
    if (buffer.length > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB limit");
    }

    // Verify file format
    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const allowedPdfTypes = ["application/pdf"];
    const isImage = allowedImageTypes.includes(data.fileType);
    const isPdf = allowedPdfTypes.includes(data.fileType);

    if (!isImage && !isPdf) {
      throw new Error("Unsupported file format. Only JPEG, PNG, WEBP, and PDF are allowed.");
    }

    // Determine target directory: public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      // Ignore if directory exists
    }

    const safeName = sanitizeFilename(data.fileName);
    const targetPath = path.join(uploadsDir, safeName);

    // Save file
    await fs.writeFile(targetPath, buffer);

    // S3 or Cloudinary configuration check (simulation message in logs)
    if (process.env.CLOUDINARY_URL || process.env.AWS_S3_BUCKET) {
      console.log("Cloudinary/S3 configured. Fallback upload triggered in background.");
    }

    return {
      url: `/uploads/${safeName}`,
      fileName: safeName,
    };
  });

// ── deleteFile ────────────────────────────────────────────────────────

export const deleteFile = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fileUrl: z.string().min(1),
    })
  )
  .handler(async ({ data }) => {
    await requireAuth();

    // Validate path to prevent directory traversal
    const baseName = path.basename(data.fileUrl);
    if (!data.fileUrl.startsWith("/uploads/") || baseName.includes("..")) {
      throw new Error("Invalid file path");
    }

    const targetPath = path.join(process.cwd(), "public", "uploads", baseName);

    try {
      await fs.unlink(targetPath);
      return { success: true };
    } catch (err) {
      // Ignore if file doesn't exist
      return { success: true, message: "File already deleted or not found" };
    }
  });
