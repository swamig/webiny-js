import React from "react";
import { cx } from "emotion";
import { ReactComponent as StepCompleteIcon } from "./../assets/ntf-complete.svg";
import { ReactComponent as StepCurrentIcon } from "./../assets/ntf-current.svg";
import { ReactComponent as StepRemainIcon } from "./../assets/ntf-remain.svg";
import styled from "@emotion/styled";
import { WizardStepsFields } from "../useWizardStepsFields";

interface WizardSidebarProps {
    wizardStepsFields: WizardStepsFields;
    currentStepIndex: number;
}

const WizardSidebarWrapper = styled("div")`
    box-shadow: 1px 1px 9px rgb(0 0 0 / 8%);
    display: flex;
    flex-direction: column;
    padding: 117px 32px;
    width: 181px;
    color: #00487a;
    font-family: Roboto-Light, sans-serif;
    font-size: 16px;
    .item {
        align-items: center;
        column-gap: 10px;
        display: flex;
        &.active {
            font-family: Roboto-Regular, sans-serif;
        }
    }
    .separator {
        border-left: 1px dashed #bababa;
        height: 64px;
        margin-left: 9px;
    }
`;

export const WizardSidebar: React.FC<WizardSidebarProps> = ({
    wizardStepsFields,
    currentStepIndex
}) => {
    return (
        <WizardSidebarWrapper>
            {wizardStepsFields.map((step, stepIndex) => (
                <React.Fragment key={step.title}>
                    <div
                        className={cx("item", {
                            active: stepIndex === currentStepIndex
                        })}
                    >
                        {stepIndex === currentStepIndex && <StepCurrentIcon />}
                        {stepIndex > currentStepIndex && <StepRemainIcon />}
                        {stepIndex < currentStepIndex && <StepCompleteIcon />}
                        {step.title}
                    </div>
                    {stepIndex < wizardStepsFields.length - 1 && (
                        <div className={"separator"} />
                    )}
                </React.Fragment>
            ))}
        </WizardSidebarWrapper>
    );
};
