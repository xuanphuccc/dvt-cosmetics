import DOMPurify from "dompurify";

function Paragraph({ value, style, className }) {
  return (
    <p
      style={{ ...style }}
      className={className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(value),
      }}
    ></p>
  );
}

export default Paragraph;
