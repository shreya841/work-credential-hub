import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "@/lib/db/index.server";
import * as schema from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { requireAuth } from "@/lib/auth/session.server";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ── listNotifications ────────────────────────────────────────────────

export const listNotifications = createServerFn({ method: "GET" }).handler(
  async (): Promise<Notification[]> => {
    const user = await requireAuth();
    const db = getDb();

    const rows = await db
      .select()
      .from(schema.notifications)
      .where(eq(schema.notifications.userId, user.id))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(50);

    return rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      title: row.title,
      message: row.message,
      read: row.read,
      createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : String(row.createdAt),
    }));
  }
);

// ── markAsRead ───────────────────────────────────────────────────────

export const markAsRead = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid("Invalid notification ID") }))
  .handler(async ({ data }) => {
    const user = await requireAuth();
    const db = getDb();

    const [updated] = await db
      .update(schema.notifications)
      .set({ read: true })
      .where(
        and(
          eq(schema.notifications.id, data.id),
          eq(schema.notifications.userId, user.id)
        )
      )
      .returning();

    return updated;
  });

// ── markAllAsRead ────────────────────────────────────────────────────

export const markAllAsRead = createServerFn({ method: "POST" }).handler(
  async () => {
    const user = await requireAuth();
    const db = getDb();

    await db
      .update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.userId, user.id));

    return { success: true };
  }
);
