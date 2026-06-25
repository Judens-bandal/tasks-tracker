"use client";
import { ProjectTable } from "@/components/shared/tables";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateDialogProject } from "./_components/create-project-dialog";

export default function Page() {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Projects</h1>

          <Button
            variant="default"
            onClick={() => setOpenCreateDialog(true)}
            type="button"
          >
            <PlusCircle className="size-4 mr-2" />
            Create Project
          </Button>
        </div>
        <ProjectTable />
      </div>
      <CreateDialogProject
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </>
  );
}
