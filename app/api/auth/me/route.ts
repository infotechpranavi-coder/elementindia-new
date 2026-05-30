import { NextResponse } from "next/server";
import { getSessionCustomer } from "@/lib/server/auth-session";
import { getCustomerById } from "@/lib/server/customers-store";

export async function GET() {
  try {
    const session = await getSessionCustomer();
    if (!session) {
      return NextResponse.json({ customer: null });
    }
    const customer = await getCustomerById(session.id);
    if (!customer) {
      return NextResponse.json({ customer: null });
    }
    return NextResponse.json({ customer });
  } catch {
    return NextResponse.json({ customer: null });
  }
}
