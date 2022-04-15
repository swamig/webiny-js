import React from "react";
import { CalculationWizardResults } from "../types";
import { StepSectionHeading } from "./styled";
import { FormRenderFbFormModelField } from "@webiny/app-form-builder/types";
import { Option } from "./CalculationResults/Option";
import { AnswersSummary } from "./CalculationResults/AnswersSummary";

interface CalculationResultsProps {
    formFields: FormRenderFbFormModelField[][];
    results: CalculationWizardResults;
    formSubmission: Record<string, any>;
}

export const CalculationResults: React.FC<CalculationResultsProps> = props => {
    const { options } = props.results;
    return (
        <>
            <AnswersSummary formFields={props.formFields} formSubmission={props.formSubmission}/>
            <StepSectionHeading small color={"#00aa46"}>
                1st option
            </StepSectionHeading>
            {options.primary.map(option => (
                <Option option={option} />
            ))}
            {options.secondary.map(option => (
                <Option option={option} />
            ))}
        </>
    );
};
