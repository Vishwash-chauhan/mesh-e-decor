import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "meshedecor2026";
const COOKIE_NAME = "admin_auth_token";
const SESSION_VALUE = "authenticated_atelier_curator_session_token";

export async function POST(req: Request) {
  try {
    const { passcode } = await req.json();

    if (!passcode || passcode.trim() !== ADMIN_PASSCODE.trim()) {
      return NextResponse.json(
        { success: false, message: "Invalid atelier passcode" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Authenticated successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication failed", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (token && token.value === SESSION_VALUE) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
