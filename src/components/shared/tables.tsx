// // components/ProjectTable.tsx
// "use client";

// import { useMemo } from "react";
// import { useFetchMyProject } from "@/hooks/use-project";

// import { DataTable } from "./DataTable";

// import { projectColumns } from "./project-culomns";
// import { useAuth } from "@/hooks/use.auth";

// export function ProjectTable() {
//   const { userId } = useAuth();

//   const queryKey = `my-projects-${userId}`;

//   const { data, isLoading, isError, error, refetch } = useFetchMyProject({
//     id: userId!,
//     queryKey,
//     enabled: !!userId,
//   });

//   const projects = useMemo(() => data?.data ?? [], [data]);

//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center p-12">
//         <p className="text-destructive">{error?.message}</p>
//         <button onClick={() => refetch()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <DataTable
//       columns={projectColumns}
//       data={projects}
//       isLoading={isLoading}
//       searchableFields={[
//         "id",
//         "title",
//         "description",
//         "status",
//         // "owner_id",
//         "start_date",
//         "end_date",
//         "created_at",
//         "updated_at",
//       ]}
//       searchPlaceholder="Search projects..."
//       pageSize={20}
//     />
//   );
// }
// "use client";

// import { useMemo } from "react";
// import { useFetchMyProject } from "@/hooks/use-project";
// import { DataTable } from "./DataTable";
// import { projectColumns } from "./project-culomns";
// import { useAuth } from "@/hooks/use.auth";

// export function ProjectTable() {
//   console.log("[ProjectTable] MOUNTED");

//   const { id} = useAuth();
//   console.log("[ProjectTable] id:", id);

//   const queryKey = `my-projects-${id}`;

//   const { data, isLoading, isError, error, refetch } = useFetchMyProject({
//     id: id!,
//     queryKey,
//     enabled: !!id,
//   });

//   console.log("[ProjectTable] query state:", {
//     data,
//     isLoading,
//     isError,
//     error,
//   });

//   const projects = useMemo(() => data?.data ?? [], [data]);
//   console.log("[ProjectTable] projects:", projects);

//   if (isError) {
//     return (
//       <div className="flex flex-col items-center justify-center p-12">
//         <p className="text-destructive">{error?.message}</p>
//         <button onClick={() => refetch()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <DataTable
//       columns={projectColumns}
//       data={projects}
//       isLoading={isLoading}
//       searchableFields={[
//         "id",
//         "title",
//         "description",
//         "status",
//         "start_date",
//         "end_date",
//         "created_at",
//         "updated_at",
//       ]}
//       searchPlaceholder="Search projects..."
//       pageSize={20}
//     />
//   );
// }
"use client";

import { useMemo } from "react";
import { useFetchMyProject } from "@/hooks/use-project";
import { DataTable } from "./DataTable";
import { projectColumns } from "./project-culomns";
import { useAuth } from "@/hooks/use.auth";

export function ProjectTable() {
  const { id: userId } = useAuth();

  const queryKey = `my-projects-${userId}`;

  const { data, isLoading, isError, error, refetch } = useFetchMyProject({
    id: userId!,
    queryKey,
    enabled: !!userId,
  });

  const projects = useMemo(() => data?.data ?? [], [data]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <p className="text-destructive">{error?.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <DataTable
      columns={projectColumns}
      data={projects}
      isLoading={isLoading}
      searchableFields={[
        "id",
        "title",
        "description",
        "status",
        "start_date",
        "end_date",
        "created_at",
        "updated_at",
      ]}
      searchPlaceholder="Search projects..."
      pageSize={20}
    />
  );
}
