import { Button } from "@/components/ui/button";
import {
  ModalForAddOrUpdateUserInfo,
  DataTableDemo,
} from "@/components/shared";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-start justify-start p-24">
      <ModalForAddOrUpdateUserInfo>
        <Button variant="outline">Add User</Button>
      </ModalForAddOrUpdateUserInfo>
      <DataTableDemo />
    </main>
  );
}
