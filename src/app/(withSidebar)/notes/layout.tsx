import { PageHeading } from "~/components/atoms/page-heading";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <PageHeading>Notas do Colaborador</PageHeading>
      <div className="pl-2">{children}</div>
    </div>
  );
}
