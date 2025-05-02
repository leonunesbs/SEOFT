import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { FaUserMd } from "react-icons/fa";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg border">
          <FaUserMd />
        </div>
        <div className="flex w-full flex-col gap-0.5 leading-none">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <div className="overflow-x-auto rounded border">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] whitespace-nowrap">
                Nº Prontuário
              </TableHead>
              <TableHead className="w-full">Nome</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead className="whitespace-nowrap">
                Data de nascimento
              </TableHead>
              <TableHead className="whitespace-nowrap">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
