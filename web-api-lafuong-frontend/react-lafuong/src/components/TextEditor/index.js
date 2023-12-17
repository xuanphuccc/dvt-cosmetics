import { Editor } from "@tinymce/tinymce-react";

function TextEditor({ editorState, onChange, height }) {
  return (
    <>
      <Editor
        onEditorChange={onChange}
        //initialValue={content}
        //outputFormat="text"

        value={editorState}
        // onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: height || 400,
          menubar: false,
          plugins: [
            "lists",
            "advlist",
            "autolink",
            "link",
            "image",
            "media",
            "searchreplace",
            "wordcount",
            "fullscreen",
            "table",
            "emoticons",
            "help",
          ],
          toolbar:
            "undo redo | fontsize bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent forecolor backcolor emoticons table | styles | " +
            "link image media | " +
            "removeformat fullscreen print | help",
          content_style: "body { font-family:Arial,Helvetica,sans-serif; font-size:14px }",
          font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
        }}
      />
    </>
  );
}
export default TextEditor;
