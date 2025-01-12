import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";
import { PageHeading } from "~/components/atoms/page-heading";
import { ClinicsTable } from "~/components/organisms/clinics-table";
import { Button } from "~/components/ui/button";
import { db } from "~/server/db";

export default async function ClinicsPage() {
  const clinics = await db.clinic.findMany({
    select: {
      id: true,
      name: true,
      collaborators: {
        include: {
          collaborator: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <PageHeading>Ambulatórios</PageHeading>
        <Link href="/settings/clinics/add" passHref>
          <Button>
            <MdAddCircleOutline size={18} />
            Adicionar
          </Button>
        </Link>
      </div>
      <div className="px-2">
        <ClinicsTable
          data={clinics.map(({ id, name, collaborators }) => ({
            id,
            name,
            collaborators:
              collaborators.length > 0
                ? collaborators
                    .map((colAssoc) => colAssoc.collaborator.name)
                    .join(", ")
                : "Nenhum médico",
          }))}
        />
      </div>
    </div>
  );
}
