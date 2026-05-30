import { NextResponse } from "next/server";
import type { LoginInput } from "@/lib/customer-types";
import { setSessionCookie } from "@/lib/server/auth-session";
import { loginCustomer } from "@/lib/server/customers-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginInput;
    const result = await loginCustomer(body);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
    if (!result.customer) {
      return NextResponse.json({ error: "Could not sign in." }, { status: 500 });
    }
    await setSessionCookie(result.customer);
    return NextResponse.json({ customer: result.customer });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
