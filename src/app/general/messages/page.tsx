import { MessageTable } from "@/components/messages/message-table";

// export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="px-4 lg:px-6">
        <MessageTable />
      </div>
    </div>
  );
}
