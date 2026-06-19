import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ── Secret Accessors ────────────────────────────────────────────────

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET environment variable is not set. Please configure a secure secret key (minimum 32 characters)."
    );
  }
  return secret;
}

export function getRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_REFRESH_SECRET environment variable is not set. Please configure a secure refresh secret key (minimum 32 characters)."
    );
  }
  return secret;
}

// ── Token Payloads ──────────────────────────────────────────────────

interface AccessTokenPayload {
  userId: string;
  role: string;
  email: string;
}

interface DecodedAccessToken extends AccessTokenPayload {
  iat: number;
  exp: number;
}

interface DecodedRefreshToken {
  userId: string;
  iat: number;
  exp: number;
}

// ── Token Signing ───────────────────────────────────────────────────

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "15m" });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ userId }, getRefreshSecret(), { expiresIn: "7d" });
}

// ── Token Verification ──────────────────────────────────────────────

export function verifyAccessToken(token: string): DecodedAccessToken {
  try {
    return jwt.verify(token, getJwtSecret()) as DecodedAccessToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Access token has expired. Please log in again.");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid access token. Please log in again.");
    }
    throw new Error("Failed to verify access token.");
  }
}

export function verifyRefreshToken(token: string): DecodedRefreshToken {
  try {
    return jwt.verify(token, getRefreshSecret()) as DecodedRefreshToken;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Refresh token has expired. Please log in again.");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid refresh token. Please log in again.");
    }
    throw new Error("Failed to verify refresh token.");
  }
}

// ── Password Hashing ────────────────────────────────────────────────

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ── Fast Token Hashing (SHA-256) for Refresh & Reset Tokens ────────────────

export function hashTokenFast(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function compareTokenFast(token: string, hash: string): Promise<boolean> {
  if (hash.startsWith("$2a$") || hash.startsWith("$2b$")) {
    return bcrypt.compare(token, hash);
  }
  try {
    const tokenHash = hashTokenFast(token);
    return crypto.timingSafeEqual(Buffer.from(tokenHash), Buffer.from(hash));
  } catch {
    return false;
  }
}
