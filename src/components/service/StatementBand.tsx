interface StatementBandProps {
  text: string;
}

/** Editorial paragraph rendering of the service longDesc — a standalone band
 * with hairlines above and below, independent of the section rhythm. */
export default function StatementBand({ text }: StatementBandProps) {
  return (
    <p className="text-text font-normal leading-[1.45] text-[clamp(20px,2.4vw,26px)] max-w-[38ch]">{text}</p>
  );
}
