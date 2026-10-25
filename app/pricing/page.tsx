import type { Metadata } from "next";
import PricingSection from "../components/PricingSection";

export const metadata: Metadata = {
  title: "Simple, Student-Friendly Plans | Alpha Housing",
  description:
    "No hidden broker markups or surprise agency fees. One transparent price for total peace of mind for roommates and parents securing student housing abroad.",
};

export default function PricingPage() {
  return (
    <div className="flex-1 bg-white flex flex-col justify-center py-6 sm:py-12">
      <PricingSection />
    </div>
  );
}
