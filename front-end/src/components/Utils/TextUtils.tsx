import { TextEnum      } from "@/lib/enumerations/TextEnum";
import { TextProps          } from "@/components/Section/Interface";
import { H1, H2, H3, P } from "@/components/Text/Text";

export function RenderText({ text, className }: { text: TextProps, className?: string })
{
    className = (text?.isBold) ? className += " font-bold" : className; 

    switch (text.size) {
        case TextEnum.H1:
            return (<H1 className={className}>{text.text}</H1>);
        case TextEnum.H2:
            return (<H2 className={className}>{text.text}</H2>);
        case TextEnum.H3:
            return (<H3 className={className}>{text.text}</H3>);
        default:
            return (<P className={className}>{text.text}</P>);
    }
}