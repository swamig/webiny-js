import React from "react";
import styled from "@emotion/styled";
import { WizardStepsFields } from "../useWizardStepsFields";

const Wrapper = styled("div")`
    display: flex;
    flex-basis: 0;
    flex-direction: column;
    flex-grow: 1;
    padding: 32px;
    .step-description {
        border-bottom: 1px solid #00487a;
        display: block;
        width: 100%;
        padding-bottom: 16px;
        color: #0a7fff;
        font-family: Roboto-Regular, sans-serif;
        font-size: 24px;
        font-weight: 400;
    }
    .step-content {
    }
`;

interface WizardContentProps {
    wizardStepsFields: WizardStepsFields;
    currentStepIndex: number;
}

export const WizardContent: React.FC<WizardContentProps> = ({
    wizardStepsFields,
    currentStepIndex,
    children
}) => {
    return (
        <Wrapper>
            <div className={"step-description"}>
                {wizardStepsFields[currentStepIndex].description}
            </div>
            <div className={"step-content"}>{children}</div>
        </Wrapper>
    );
};
