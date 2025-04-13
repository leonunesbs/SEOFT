"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";

const medicationSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  category: z.string().min(1, "Categoria obrigatória"),
  unit: z.string().min(1, "Unidade obrigatória"),
  instructions: z
    .array(z.object({ value: z.string().min(1, "Instrução obrigatória") }))
    .min(1, "Informe pelo menos uma instrução"),
  specialControl: z.boolean(),
  eyedrop: z.boolean(),
});

type MedicationForm = z.infer<typeof medicationSchema>;

export default function Page() {
  const form = useForm<MedicationForm>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      category: "",
      unit: "",
      instructions: [{ value: "" }],
      specialControl: false,
      eyedrop: false,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [medications, setMedications] = useState<
    (MedicationForm & { id: string })[]
  >([]);

  const getAll = api.medication.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const create = api.medication.create.useMutation();
  const update = api.medication.update.useMutation();
  const deleteMedication = api.medication.delete.useMutation();

  useEffect(() => {
    if (getAll.data) {
      const mapped = getAll.data.map((med) => ({
        ...med,
        instructions: med.instructions.map((value) => ({ value })),
      }));
      setMedications(mapped);
    }
  }, [getAll.data]);

  const onSubmit = async (data: MedicationForm) => {
    const instructions = data.instructions.map((i) => i.value);

    try {
      if (selectedIndex !== null) {
        await update.mutateAsync({
          id: medications[selectedIndex]?.id as string,
          ...data,
          instructions,
        });
        toast({ title: "Medicamento atualizado!" });
      } else {
        await create.mutateAsync({ ...data, instructions });
        toast({ title: "Medicamento adicionado!" });
      }

      form.reset();
      setSelectedIndex(null);
      await getAll.refetch();
    } catch {
      toast({
        title: "Erro",
        description: "Falha ao salvar medicamento.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (index: number) => {
    const med = medications[index];
    form.setValue("name", med?.name ?? "");
    form.setValue("category", med?.category ?? "");
    form.setValue("unit", med?.unit ?? "");
    form.setValue("specialControl", med?.specialControl ?? false);
    form.setValue("eyedrop", med?.eyedrop ?? false);
    replace((med?.instructions ?? []).map((i) => ({ value: i.value })));
    setSelectedIndex(index);
  };

  const handleDelete = async (index: number) => {
    const med = medications[index];
    try {
      await deleteMedication.mutateAsync(med?.id as string);
      toast({ title: `Medicamento "${med?.name}" excluído!` });
      if (index === selectedIndex) {
        form.reset();
        setSelectedIndex(null);
      }
      await getAll.refetch();
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível excluir.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Instruções</TableHead>
              <TableHead>Controle Especial</TableHead>
              <TableHead>É colírio?</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med, i) => (
              <TableRow key={med.id}>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.category}</TableCell>
                <TableCell>{med.unit}</TableCell>
                <TableCell>
                  <ul className="ml-4 list-disc">
                    {med.instructions.map((instr, j) => (
                      <li key={j}>
                        <>{instr.value}</>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>{med.specialControl ? "Sim" : "Não"}</TableCell>
                <TableCell>{med.eyedrop ? "Sim" : "Não"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleEdit(i)}
                    >
                      <MdEdit size={18} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="destructive">
                          <MdDelete size={18} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirmar exclusão
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Deseja excluir o medicamento{" "}
                            <strong>{med.name}</strong>? Essa ação é
                            irreversível.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(i)}>
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded border p-4"
        >
          <h2 className="text-lg font-semibold">
            {selectedIndex !== null ? "Editar Medicamento" : "Novo Medicamento"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2 space-y-2">
              <FormLabel>Instruções Padrão</FormLabel>
              {fields.map((fieldItem, index) => (
                <FormField
                  key={fieldItem.id}
                  control={form.control}
                  name={`instructions.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Textarea {...field} className="w-full" />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(index)}
                      >
                        Remover
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="ghost"
                onClick={() => append({ value: "" })}
              >
                + Adicionar instrução
              </Button>
            </div>

            <FormField
              control={form.control}
              name="specialControl"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Controle especial</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eyedrop"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>É colírio?</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mt-4">
            {selectedIndex !== null
              ? "Atualizar medicamento"
              : "Adicionar medicamento"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
