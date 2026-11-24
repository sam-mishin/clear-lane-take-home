import Link from "next/link";

// TODO: style the ClearLane wordmark (simple text mark per the brief).
export function Wordmark() {
  return (
    <Link href="/" className="text-xl font-bold">
      ClearLane Auto
    </Link>
  );
}
