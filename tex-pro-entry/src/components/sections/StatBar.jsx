const stats = [
  { value: "Est. 2023", label: "Serving East Texas & beyond" },
  { value: "5", label: "East Texas service areas" },
  { value: "4", label: "Core service lines" },
];


export default function StatBar() {
  return (
    <section className="relative bg-primary text-primary-foreground border-t-4 border-accent">
      <div className="mx-auto max-w-monolith px-6 lg:px-10 grid grid-cols-2 md:grid-cols-3 divide-x divide-primary-foreground/15">
        {stats.map((s) =>
          <div key={s.label} className="px-6 py-10 text-center">
            <div className="font-heading text-3xl sm:text-4xl lg:text-5xl text-accent leading-none">{s.value}</div>
            <div className="mt-3 font-mono-tech text-[11px] text-primary-foreground/70">{s.label}</div>
          </div>
        )}
      </div>
    </section>
  );
}