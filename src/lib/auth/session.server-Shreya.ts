import { getCookie } from "@tanstack/react-start/server";
import { verifyAccessToken } from "./jwt.server";
import { getDb } from "../db/index.server";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import type { AuthUser } from "../types";

export async function getSession(): Promise<AuthUser | null> {
  try {
    const token = getCookie("access_token");
    if (!token) {
      return null;
    }

    const decoded = verifyAccessToken(token);
    const db = getDb();
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        fullName: users.fullName,
        role: users.role,
        companyId: users.companyId,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(eq(users.id, decoded.userId))
      .limit(1);

    if (!user) {
      return null;
    }

    return user as AuthUser;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<AuthUser> {
  const session = await getSession();
  if (!session) {
    throw new Error(
      "Authentication required. Please log in to access this resource."
    );
  }
  return session;
}

export async function requireRole(allowedRoles: string[]): Promise<AuthUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error(
      `Access denied. This action requires one of the following roles: ${allowedRoles.join(", ")}. Your current role is: ${user.role}.`
    );
  }
  return user;
}
