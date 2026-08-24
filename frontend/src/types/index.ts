export interface Service {
  id: number;
  name: string;
  description: string;
  price: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: number;
  image_url: string;
  title: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export type EnquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PreferredContactMethod = "PHONE" | "EMAIL" | "WHATSAPP";

export interface Enquiry {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  service_type: string;
  problem_description: string;
  preferred_contact_method: PreferredContactMethod;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export type EnquiryPayload = Omit<
  Enquiry,
  "id" | "status" | "created_at" | "updated_at"
>;

export interface WebsiteContent {
  id: number;
  section: string;
  title: string;
  description: string;
  image_url: string | null;
  metadata: Record<string, unknown>;
  updated_at: string;
}

export interface ApiError {
  detail?: string;
  [field: string]: unknown;
}
