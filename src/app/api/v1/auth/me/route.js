import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "No has iniciado sesión." }, { status: 401 });
  }
  return NextResponse.json({ username: session.username, role: session.role });
}