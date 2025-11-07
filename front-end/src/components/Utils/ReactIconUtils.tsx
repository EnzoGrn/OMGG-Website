import React from "react";
import * as Fa6 from "react-icons/fa6";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import { IconType } from "react-icons";

const libs: Record<string, any> = {
    "fa6": Fa6,
    "ri": Ri,
    "si": Si
}

export function DynamicLoad(iconSlug: string) {
    // Split the string "Fa6 FaIcon" into ["Fa6", "FaIcon"]
    const array: string[] = iconSlug.split(' ');
    const lib = libs[array[0]];
    const Icon: IconType = (lib && array[1] && lib[array[1]]) ? lib[array[1]] : Fa6["FaQuestion"];
    
    return (
        <Icon className="size-6"/>
    );
}