import styled from "@emotion/styled";

export const StepSectionHeading = styled("div")<{ color?: string; small?: boolean }>(
    ({ small, color = "#0a7fff" }) => `
    border-bottom: 1px solid ${color};
    display: block;
    width: 100%;
    padding-bottom: ${small ? 8 : 16}px;
    color: ${color};
    font-family: Roboto-Regular, sans-serif;
    font-size: ${small ? 18 : 24}px;
    font-weight: 400;
`
);
