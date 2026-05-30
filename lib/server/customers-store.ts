import type { CustomerProfile, LoginInput, RegisterInput } from "@/lib/customer-types";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { isValidPhone, normalizePhone } from "@/lib/phone";
import { CUSTOMERS_COLLECTION, getDb } from "@/lib/server/db/mongodb";
import {
  toCustomerProfile,
  type CustomerDocument,
} from "@/lib/server/db/customer-schema";
import { hashPassword, verifyPassword } from "@/lib/server/password";

function validateRegister(input: RegisterInput): string | null {
  const name = input.name?.trim();
  if (!name || name.length < 2) return "Please enter your full name.";
  if (!isValidEmail(input.email)) return "Please enter a valid email address.";
  if (!isValidPhone(input.phone)) return "Please enter a valid 10-digit mobile number.";
  if (!input.password || input.password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
}

export async function registerCustomer(input: RegisterInput): Promise<{
  customer?: CustomerProfile;
  error?: string;
}> {
  const validation = validateRegister(input);
  if (validation) return { error: validation };

  const email = normalizeEmail(input.email);
  const phone = normalizePhone(input.phone);
  const db = await getDb();

  const existingEmail = await db.collection<CustomerDocument>(CUSTOMERS_COLLECTION).findOne({ email });
  if (existingEmail) {
    return { error: "An account with this email already exists. Please sign in." };
  }

  const existingPhone = await db.collection<CustomerDocument>(CUSTOMERS_COLLECTION).findOne({ phone });
  if (existingPhone) {
    return { error: "An account with this mobile number already exists. Please sign in." };
  }

  const now = new Date();
  const doc: CustomerDocument = {
    id: `cust-${Date.now()}`,
    name: input.name.trim(),
    email,
    phone,
    passwordHash: hashPassword(input.password),
    createdAt: now,
    updatedAt: now,
  };

  await db.collection<CustomerDocument>(CUSTOMERS_COLLECTION).insertOne(doc);
  return { customer: toCustomerProfile(doc) };
}

export async function loginCustomer(input: LoginInput): Promise<{
  customer?: CustomerProfile;
  error?: string;
}> {
  if (!isValidEmail(input.email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!input.password) {
    return { error: "Please enter your password." };
  }

  const email = normalizeEmail(input.email);
  const db = await getDb();
  const doc = await db.collection<CustomerDocument>(CUSTOMERS_COLLECTION).findOne({ email });
  if (!doc || !verifyPassword(input.password, doc.passwordHash)) {
    return { error: "Invalid email or password." };
  }

  return { customer: toCustomerProfile(doc) };
}

export async function getCustomerById(id: string): Promise<CustomerProfile | null> {
  const db = await getDb();
  const doc = await db.collection<CustomerDocument>(CUSTOMERS_COLLECTION).findOne({ id });
  if (!doc) return null;
  return toCustomerProfile(doc);
}
