import { PageHeading } from "~/components/atoms/page-heading";

export default function SearchPatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-4xl flex-col gap-4">
      <PageHeading>Medicamentos</PageHeading>
      <div className="pl-2">{children}</div>
    </div>
  );
}
