import { NextResponse } from "next/server";
import type { RegisterInput } from "@/lib/customer-types";
import { setSessionCookie } from "@/lib/server/auth-session";
import { registerCustomer } from "@/lib/server/customers-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterInput;
    const result = await registerCustomer(body);
    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    if (!result.customer) {
      return NextResponse.json({ error: "Could not create account." }, { status: 500 });
    }
    await setSessionCookie(result.customer);
    return NextResponse.json({ customer: result.customer });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
