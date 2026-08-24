import { api } from "./api";
import type { GalleryImage } from "../types";

export async function fetchGalleryImages(): Promise<GalleryImage[]> {
  const { data } = await api.get<GalleryImage[]>("/gallery/");
  return data;
}
