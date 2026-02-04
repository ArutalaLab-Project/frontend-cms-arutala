import { DataTable } from "@/components/data-table";
// import data from "./data.json";
import { apiClient } from "@/lib/api-client";

interface Message {
  message_id: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  organization_name: string;
  message_status: string;
  subject: [];
  message_body: string;
  created_date: string;
}

const getMessages = async () => {
  try {
    const response = await apiClient("/messages", {
      method: "GET",
      cache: "no-store", // Selalu fetch data terbaru
    });

    // console.log(await data.json());

    // if (!response.ok) {
    //   throw new Error('Failed to fetch products');
    // }

    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export default async function Page() {
  const response = await getMessages();
  console.log(response.data);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DataTable data={response.data} />
        </div>
      </div>
    </div>
  );
}
