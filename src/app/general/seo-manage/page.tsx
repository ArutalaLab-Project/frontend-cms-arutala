import { PageTable } from "@/features/seo-manage";

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="p-4 lg:px-6">
        <PageTable />
      </div>
    </div>
  );
}
