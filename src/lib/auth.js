import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "agagem_session";
const MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret());
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const sessionCookie = {
  name: COOKIE_NAME,
  maxAge: MAX_AGE,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};