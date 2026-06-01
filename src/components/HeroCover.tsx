const KEYWORDS = [
  { text: "TARIFF", color: "text-tfa-red", className: "left-[4%] top-[18%] -rotate-6" },
  { text: "FILIBUSTER", color: "text-white/30", className: "left-[8%] top-[32%] rotate-3" },
  { text: "ICE", color: "text-white/25", className: "right-[12%] top-[22%] -rotate-3" },
  { text: "POLARIZATION", color: "text-white/25", className: "right-[6%] top-[36%] rotate-6" },
  { text: "ELECTION", color: "text-tfa-red", className: "left-[6%] bottom-[28%] rotate-6" },
  { text: "ECONOMY", color: "text-tfa-red", className: "right-[10%] bottom-[32%] -rotate-6" },
];

export function HeroCover() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-55"
      aria-hidden
    >
      {KEYWORDS.map((kw) => (
        <span
          key={kw.text}
          className={`absolute font-display text-[0.55rem] font-bold tracking-wider sm:text-xs ${kw.color} ${kw.className}`}
        >
          {kw.text}
        </span>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-tfa-blue/20 via-transparent to-tfa-red/10" />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
