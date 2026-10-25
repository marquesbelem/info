import { HomeView } from "@/components/HomeView";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("en", "home");

export default function Page() {
  return <HomeView lang="en" />;
}
