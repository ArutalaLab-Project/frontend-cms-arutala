import { Button } from "@/components/ui/button";
import ArticleEditor, { ArticleEditorHandle } from "./article-editor";
import { sampleArticle } from "./dummy-data-article";
import { useRef } from "react";
import { OutputData } from "@editorjs/editorjs";

interface Props {
  onChange: (data: OutputData) => void;
}

export default function ArticleCreate({ onChange }: Props) {
  const editorRef = useRef<ArticleEditorHandle>(null);

  const handleSave = async () => {
    const data = await editorRef.current?.save();
    if (!data) return;

    onChange(data); // 🔥 kirim ke parent
  };

  return (
    <div className="">
      <ArticleEditor ref={editorRef} defaultData={sampleArticle} />

      <Button onClick={handleSave}>Update Preview</Button>
    </div>
  );
}
