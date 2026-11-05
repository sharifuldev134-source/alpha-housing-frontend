import type { Metadata } from "next";
import PricingSection from "../components/PricingSection";

export const metadata: Metadata = {
  title: "Simple, Student-Friendly Plans | Alpha Housing",
  description:
    "No hidden broker markups or surprise agency fees. One transparent price for total peace of mind for roommates and parents securing student housing abroad.",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-[#0B0F17]">
      <PricingSection />
    </div>
  );
}
