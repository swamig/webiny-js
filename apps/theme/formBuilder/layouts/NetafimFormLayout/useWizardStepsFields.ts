import { FormRenderFbFormModelField } from "@webiny/app-form-builder/types";

export type WizardStepsFields = Array<{
    title: string;
    description: string;
    rows: Array<FormRenderFbFormModelField[]>;
}>;

export const useWizardStepsFields = (fields: Array<FormRenderFbFormModelField[]>) => {
    const stepsFields: WizardStepsFields = [];
    fields.forEach(row => {
        const [firstField] = row;

        const isStepDeclaration = firstField.fieldId.startsWith("_step");
        if (isStepDeclaration) {
            stepsFields.push({
                title: firstField.label || "",
                description: firstField.helpText || "",
                rows: []
            });
        } else {
            stepsFields[stepsFields.length - 1].rows.push(row);
        }
    });

    return stepsFields;
};
