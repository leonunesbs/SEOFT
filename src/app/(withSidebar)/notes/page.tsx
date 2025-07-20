import NotesArea from "~/components/organisms/notes-area";
// app/notes/page.tsx
import { cookies } from "next/headers";
import { db } from "~/server/db";

export default async function NotesPage() {
  // lê colaborador selecionado
  const cookieStore = cookies();
  const collaboratorId = (await cookieStore).get(
    "selected-collaborator",
  )?.value;

  console.log(
    "[NotesPage] Carregando página com collaboratorId:",
    collaboratorId,
  );

  let initialNote = "";
  let collaboratorName = "";
  if (collaboratorId) {
    const collab = await db.collaborator.findUnique({
      where: { id: collaboratorId },
      select: { persistentNote: true, name: true },
    });
    initialNote = collab?.persistentNote ?? "";
    collaboratorName = collab?.name ?? "";

    console.log("[NotesPage] Dados do colaborador carregados:", {
      name: collaboratorName,
      noteLength: initialNote.length,
    });
  }

  return (
    <div className="space-y-4">
      {collaboratorId ? (
        <NotesArea
          initialNote={initialNote}
          collaboratorName={collaboratorName}
        />
      ) : (
        <div className="text-center">
          Selecione um colaborador para começar a usar o bloco de notas.
        </div>
      )}
    </div>
  );
}
