import { ImageOff } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { fetchGalleryImages } from "../services/gallery";
import { EmptyState, ErrorState, LoadingState } from "./StateViews";

export default function GallerySection() {
  const { data, loading, error } = useFetch(fetchGalleryImages, []);

  return (
    <section id="gallery" className="bg-ink-50/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Gallery
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            A look at our work
          </p>
        </div>

        {loading && <LoadingState label="Loading gallery..." />}
        {error && <ErrorState message={error} />}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState message="Gallery photos will appear here soon." />
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((image) => (
              <figure
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-ink-200"
              >
                {image.image_url ? (
                  <img
                    src={image.image_url}
                    alt={image.title || "Repair shop photo"}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-ink-400">
                    <ImageOff className="h-8 w-8" aria-hidden="true" />
                  </div>
                )}
                {image.title && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm text-white opacity-0 transition group-hover:opacity-100">
                    {image.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
