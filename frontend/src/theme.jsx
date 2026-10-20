// Palette grounded in Northeast India — tea-garden sage, Bihu-gold,
// deep hill-teal, warm ivory paper, soft clay-rose.
export const C = {
  paper: "#F7F3EA",
  paperDeep: "#EFE8D8",
  ink: "#22332F",
  inkSoft: "#4B5A54",
  teal: "#1F4A45",
  tealDeep: "#12302C",
  sage: "#7C9B7E",
  sageSoft: "#DCE7D9",
  gold: "#D9A441",
  goldSoft: "#F3E2B8",
  rose: "#C97D7A",
  roseSoft: "#F0DCD9",
  white: "#FFFDF8",
};

export const fontDisplay = { fontFamily: "'Fraunces', serif" };
export const fontBody = { fontFamily: "'Manrope', sans-serif" };
export const fontMono = { fontFamily: "'IBM Plex Mono', monospace" };

export function Pill({ children, tone = "sage" }) {
  const map = {
    sage: { bg: C.sageSoft, fg: C.teal },
    gold: { bg: C.goldSoft, fg: "#8A6416" },
    rose: { bg: C.roseSoft, fg: "#8B4A47" },
  };
  const t = map[tone];
  return (
    <span
      style={{ background: t.bg, color: t.fg, ...fontBody }}
      className="text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1"
    >
      {children}
    </span>
  );
}
