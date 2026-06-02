import { redirect } from "next/navigation";

// Preise-Seite deaktiviert.
// Alle Preisdaten sind gesichert in: app/lib/pricing-backup.tsx
export default function Preise() {
  redirect("/");
}
