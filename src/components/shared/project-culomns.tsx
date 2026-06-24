import { TProject } from "@/types/project.type";
import { ColumnDef } from "@tanstack/react-table";

export const projectColumns: ColumnDef<TProject>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "owner_id",
    header: "Owner",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "created_at",
    header: "Data Created",
  },
  {
    accessorKey: "updated_at",
    header: "Data Updated",
  },
];
