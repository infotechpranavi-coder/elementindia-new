import type { CustomerProfile } from "@/lib/customer-types";
import { formatPhoneDisplay } from "@/lib/phone";

export type CustomerDocument = {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toCustomerProfile(doc: CustomerDocument): CustomerProfile {
  return {
    id: doc.id,
    name: doc.name,
    email: doc.email ?? "",
    phone: formatPhoneDisplay(doc.phone),
    createdAt: doc.createdAt.toISOString(),
  };
}
