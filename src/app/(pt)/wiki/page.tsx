import { WikiView } from "@/components/WikiView";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("pt", "wiki");

export default function Page() {
  return <WikiView lang="pt" />;
}
