import { TextEnum } from "@/lib/enumerations/TextEnum";
import { TextProps } from "@/components/Section/Interface";
import { H1, H2, H3, P } from "@/components/Text/Text";

function formatText(text: string) {
  return text.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      {index < text.split("\n").length - 1 && <br />}
    </span>
  ));
}

export function RenderText({ text, className }: { text: TextProps, className?: string }) {
  if (text === null)
    return null;
  if (className)
    className = (text?.isBold) ? className += " font-bold" : className;
  const content = formatText(text.text);

  switch (text.size) {
    case TextEnum.H1:
      return (<H1 className={className}>{content}</H1>);
    case TextEnum.H2:
      return (<H2 className={className}>{content}</H2>);
    case TextEnum.H3:
      return (<H3 className={className}>{content}</H3>);
    default:
      return (<P className={className}>{content}</P>);
  }
}
