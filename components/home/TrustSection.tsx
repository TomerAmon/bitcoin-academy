const companies = ["BINANCE", "COINBASE", "KRAKEN", "LEDGER", "TREZOR"];

export default function TrustSection() {
  return (
    <section className="py-12 border-y border-outline-variant/20 bg-surface-container-lowest/50 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
        <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-8">
          בוגרינו עובדים בחברות המובילות בתעשייה
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {companies.map((name) => (
            <span key={name} className="text-xl md:text-2xl font-black tracking-tighter text-on-surface">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
