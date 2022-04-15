import React, { useMemo } from "react";
import { FbFormModelField, FormRenderFbFormModelField } from "@webiny/app-form-builder/types";
import { Card } from "./Card";

const getFieldValueLabel = (field: FbFormModelField, value: string): string => {
    const options = field.options || [];
    if (options.length > 0) {
        const selectedOption = options.find(option => option.value === value);
        if (selectedOption) {
            return selectedOption.label;
        }
    }

    return value;
};

const getAnswer = (field: FbFormModelField, value: string): string => {
    if (Array.isArray(value)) {
        return value.map(v => getFieldValueLabel(field, v)).join(", ") || "N/A";
    }

    return getFieldValueLabel(field, value) || "N/A";
};

export const AnswersSummary: React.FC<{
    formFields: FormRenderFbFormModelField[][];
    formSubmission: Record<string, any>;
}> = ({ formFields, formSubmission }) => {
    console.log({ formFields, formSubmission });

    console.log(formFields);

    const answers = useMemo(() => {
        return (
            formFields
                // In our case, every row consists of a single field.
                // So, it's fine to just pick the first item from each row.
                .map(row => row[0])
                .map(field => ({
                    fieldId: field.fieldId,
                    answer: getAnswer(field, formSubmission[field.fieldId])
                }))
                .reduce((current: Record<string, string>, item) => {
                    current[item.fieldId] = item.answer;
                    return current;
                }, {})
        );
    }, [formFields, formSubmission]);

    console.log(answers);
    return (
        <Card color={"#0a7fff"}>
            <div className="title">Working conditions</div>
            <h5>
                {answers.systemMaximumFlowRate} m³/h | {answers.systemPressure} bar
            </h5>
            <h5>{answers.fieldIrrigation}</h5>
            <h4>Water source & quality</h4>
            <ul>
                <li>
                    Main water source: <strong>{answers.whatIsYourMainWaterSource}</strong>
                </li>
                <li>
                    Suction point: <strong>{answers.whatIsYourSuctionPointWaterSource}</strong>
                </li>
                <li>
                    Sand concentration: <strong>{answers.sandConcentration}</strong>
                </li>
                <li>
                    Silt/Clay concentration: <strong>{answers.siltClayConcentration}</strong>
                </li>
                <li>
                    Total Suspended Solids: <strong>{answers.totalSuspendedSolids}</strong>
                </li>
                <li>
                    Presence of organic matter:{" "}
                    <strong>{answers.organicMatterAlgaeZooplanktonBacteria}</strong>
                </li>
                <li>
                    Presence of Fe/Mn in the water:{" "}
                    <strong> {answers.isThereIronAndOrManganeseFeMnInTheWater}</strong>
                </li>
            </ul>
        </Card>
    );
};
