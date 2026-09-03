import { useFetch } from "../hooks/useFetch";
import { fetchServices } from "../services/services";
import ServiceCard from "./ServiceCard";
import { EmptyState, ErrorState, LoadingState } from "./StateViews";

export default function ServicesSection() {
  const { data, loading, error } = useFetch(fetchServices, []);

  return (
    <section id="services" className="bg-ink-50/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            Repairs we handle every day
          </p>
          <p className="mt-4 text-ink-600">
            From cracked screens to water damage, our technicians work on all
            major phone brands and issues.
          </p>
        </div>

        {loading && <LoadingState label="Loading services..." />}
        {error && <ErrorState message={error} />}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState message="Services will be listed here shortly." />
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
