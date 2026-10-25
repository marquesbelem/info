import { HomeView } from "@/components/HomeView";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("pt", "home");

export default function Page() {
  return <HomeView lang="pt" />;
}
