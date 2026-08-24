import { api } from "./api";
import type { Enquiry, EnquiryPayload } from "../types";

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<Enquiry> {
  const { data } = await api.post<Enquiry>("/enquiries/", payload);
  return data;
}
