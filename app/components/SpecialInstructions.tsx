export default function SpecialInstruction({ note, setNote }: any) {
  return (
    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Enter instructions..."
      required
    />
  );
}