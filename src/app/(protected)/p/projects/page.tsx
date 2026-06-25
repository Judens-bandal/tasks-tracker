"use client";
import { ProjectTable } from "@/components/shared/tables";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { CreateDialogProject } from "./_components/create-project-dialog";
import { useAuthStore } from "@/stores/auth.store";

export default function Page() {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const userId = useAuthStore((s) => s.user?.id);
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <>
      <div className="space-y-2">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          sed veritatis deserunt obcaecati. Distinctio cumque nam harum laborum
          fugit, eius rem ea vel nesciunt nostrum est a blanditiis hic facere.
        </div>
        <div className="flex gap-4">
          <ProjectTable />
          <Button
            variant="outline"
            onClick={() => {
              setOpenCreateDialog(true);
            }}
            type="button"
          >
            <PlusCircle />
            Create
          </Button>
        </div>
      </div>
      <CreateDialogProject
        open={openCreateDialog}
        onOpenChange={setOpenCreateDialog}
      />
    </>
  );
}
