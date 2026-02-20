/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import type EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";

export interface ArticleEditorHandle {
  save: () => Promise<OutputData | undefined>;
}

interface ArticleEditorProps {
  defaultData?: OutputData;
  readOnly?: boolean;
  onUploadImage?: (file: File) => Promise<string>;
}

const ArticleEditor = forwardRef<ArticleEditorHandle, ArticleEditorProps>(({ defaultData, readOnly = false, onUploadImage }, ref) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    async save() {
      return await editorRef.current?.save();
    },
  }));

  useEffect(() => {
    if (!holderRef.current) return;
    if (editorRef.current) return;

    const initEditor = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const ImageTool = (await import("@editorjs/image")).default;
      const List = (await import("@editorjs/list")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const Code = (await import("@editorjs/code")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;
      const Underline = (await import("@editorjs/underline")).default;

      const editor = new EditorJS({
        holder: holderRef.current!,
        readOnly,
        data: defaultData ?? {
          blocks: [
            {
              type: "header",
              data: {
                text: "Masukkan Judul Artikel...",
                level: 1,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Mulai menulis artikel Anda di sini...",
              },
            },
          ],
        },

        tools: {
          header: {
            class: Header as unknown as any,
            inlineToolbar: true,
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
          paragraph: {
            class: Paragraph as unknown as any,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool as unknown as any,
            config: {
              uploader: {
                uploadByFile: async (file: File) => {
                  if (!onUploadImage) {
                    throw new Error("Upload handler not provided");
                  }

                  const url = await onUploadImage(file);

                  return {
                    success: 1,
                    file: { url },
                  };
                },
              },
            },
          },
          list: {
            class: List as unknown as any,
            inlineToolbar: true,
          },
          quote: {
            class: Quote as unknown as any,
            inlineToolbar: true,
          },
          code: Code as unknown as any,
          delimiter: Delimiter as unknown as any,
          inlineCode: InlineCode as unknown as any,
          underline: Underline as unknown as any,
        },
      });

      editorRef.current = editor;
    };

    initEditor();

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [defaultData, readOnly, onUploadImage]);

  return (
    <div className="prose max-w-none dark:prose-invert">
      <div ref={holderRef} />
    </div>
  );
});

ArticleEditor.displayName = "ArticleEditor";

export default ArticleEditor;
