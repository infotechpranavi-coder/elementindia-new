import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { CustomerProfile } from "@/lib/customer-types";

export const SESSION_COOKIE = "elemen_customer_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 30;

type SessionPayload = {
  sub: string;
  name: string;
  email: string;
  phone: string;
  exp: number;
};

function sessionSecret() {
  return process.env.AUTH_SESSION_SECRET?.trim() || "elemen-dev-session-secret-change-me";
}

function sign(body: string) {
  return createHmac("sha256", sessionSecret()).update(body).digest("base64url");
}

export function createSessionToken(profile: CustomerProfile): string {
  const payload: SessionPayload = {
    sub: profile.id,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function parseSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.sub || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  };
}

export async function getSessionCustomer(): Promise<CustomerProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const payload = parseSessionToken(token);
  if (!payload) return null;
  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email ?? "",
    phone: payload.phone ?? "",
    createdAt: "",
  };
}

export async function setSessionCookie(profile: CustomerProfile) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(profile), sessionCookieOptions());
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
}
