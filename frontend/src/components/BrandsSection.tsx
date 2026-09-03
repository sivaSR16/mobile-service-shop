const brands = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Xiaomi",
  "Redmi",
  "Vivo",
  "Oppo",
  "Realme",
  "Motorola",
];

export default function BrandsSection() {
  return (
    <section className="border-y border-ink-100 bg-white/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-ink-600">
          Brands we service
        </p>
        <div className="mt-8 grid grid-cols-3 gap-x-6 gap-y-6 text-center sm:grid-cols-5 lg:grid-cols-9">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-semibold text-ink-500 transition hover:text-brand-600"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
