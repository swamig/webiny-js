import React from "react";
import { Chip as RmwcChip, ChipProps as RmwcChipProps } from "@rmwc/chip";

export type ChipProps = RmwcChipProps;

export const Chip: React.FC<ChipProps> = props => {
    const { children, ...rest } = props;
    return <RmwcChip {...rest}>{children}</RmwcChip>;
};
