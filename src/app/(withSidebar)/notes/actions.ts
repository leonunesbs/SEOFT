// app/notes/actions.ts
"use server";

import { cookies } from "next/headers";
import { db } from "~/server/db";

export async function updateNoteAction(note: string) {
  const collaboratorId = (await cookies()).get("selected-collaborator")?.value;

  if (!collaboratorId) {
    return;
  }

  try {
    const updated = await db.collaborator.update({
      where: { id: collaboratorId },
      data: { persistentNote: note },
    });
    console.log("[updateNoteAction] atualizado com sucesso:", updated.id);
  } catch (error) {
    console.error("[updateNoteAction] erro ao atualizar:", error);
  }
}
