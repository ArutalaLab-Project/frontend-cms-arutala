"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ArticleCreate from "@/features/article/component/article-create";
import { ArticlePreview } from "@/features/article/component/article-preview";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import type { OutputData } from "@editorjs/editorjs";

export default function Page() {
  const [data, setData] = useState<OutputData | null>(null);
  console.log(data);

  return (
    <div className="flex flex-1 flex-col">
      <div className="p-4 lg:px-6">
        <Tabs defaultValue="editor" className="space-y-6">
          <TabsList>
            <TabsTrigger value="editor">
              {" "}
              <CodeIcon /> Editor
            </TabsTrigger>
            <TabsTrigger value="preview">
              <AppWindowIcon />
              Preview
            </TabsTrigger>
            {/* <TabsTrigger value="code">
              <CodeIcon />
              Code
            </TabsTrigger> */}
          </TabsList>

          {/* EDITOR */}
          <TabsContent value="editor">
            <ArticleCreate onChange={setData} />
          </TabsContent>

          {/* PREVIEW */}
          <TabsContent value="preview" className="flex flex-col w-full items-center">
            {data && <ArticlePreview title={data.blocks?.[0]?.type === "header" ? data.blocks[0].data.text : "Untitled"} data={data} />}
          </TabsContent>

          {/* CODE */}
          {/* <TabsContent value="code">
            <pre className="rounded-md bg-muted p-4 text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
}
