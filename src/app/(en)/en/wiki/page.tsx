import { WikiView } from "@/components/WikiView";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "wiki");

export default function Page() {
  return <WikiView lang="en" />;
}
