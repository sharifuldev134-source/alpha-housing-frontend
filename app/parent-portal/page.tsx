import { redirect } from "next/navigation";

export default function ParentPortalPage() {
  redirect("/dashboard?tab=parent");
}
