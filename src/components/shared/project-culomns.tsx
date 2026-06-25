// import { TProject } from "@/types/project.type";
// import { ColumnDef } from "@tanstack/react-table";

// export const projectColumns: ColumnDef<TProject>[] = [
//   {
//     accessorKey: "id",
//     header: "#",
//   },
//   {
//     accessorKey: "title",
//     header: "Title",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
//   {
//     accessorKey: "owner_id",
//     header: "Owner",
//   },
//   {
//     accessorKey: "start_date",
//     header: "Start Date",
//   },
//   {
//     accessorKey: "end_date",
//     header: "End Date",
//   },
//   {
//     accessorKey: "created_at",
//     header: "Data Created",
//   },
//   {
//     accessorKey: "updated_at",
//     header: "Data Updated",
//   },
// ];
import { TProject } from "@/types/project.type";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return value.split(" ")[0]; // "2026-05-10 08:00" → "2026-05-10"
}

const STATUS_MAP: Record<
  string,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  active: { label: "Active", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  archived: { label: "Archived", variant: "outline" },
  on_hold: { label: "On Hold", variant: "destructive" },
};

export const projectColumns: ColumnDef<TProject>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 60,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("title")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue<string>("description");
      return (
        <span className="text-muted-foreground text-sm line-clamp-1 max-w-[200px]">
          {desc ?? "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const config = STATUS_MAP[status] ?? {
        label: status,
        variant: "outline",
      };
      return <Badge variant={config.variant}>{config.label}</Badge>;
    },
  },
  // {
  //   accessorKey: "owner_id",
  //   header: "Owner",
  //   cell: ({ row }) => (
  //     <span className="text-muted-foreground text-sm">
  //       #{row.getValue("owner_id")}
  //     </span>
  //   ),
  // },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => formatDate(row.getValue("start_date")),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => formatDate(row.getValue("end_date")),
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => formatDate(row.getValue("created_at")),
  },
  {
    accessorKey: "updated_at",
    header: "Date Updated",
    cell: ({ row }) => formatDate(row.getValue("updated_at")),
  },
];
