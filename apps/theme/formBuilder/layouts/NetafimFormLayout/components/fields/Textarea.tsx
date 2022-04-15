import * as React from "react";
import { FbFormModelField } from "@webiny/app-form-builder/types";
import { BindComponentRenderProp } from "@webiny/form";
import { HelperMessage } from "../HelperMessage";

interface TextareaProps {
    bind: BindComponentRenderProp;
    field: FbFormModelField;
    fieldIndex: number;
}

export const Textarea: React.FC<TextareaProps> = props => {
    const { onChange, value, validation } = props.bind;

    return (
        <div className="webiny-fb-form-field webiny-fb-form-field--textarea">
            <label className="webiny-fb-form-field__label webiny-pb-typography-body">
                <div className={"field-index-label"}>
                    <div className={"field-index"}>{props.fieldIndex + 1}</div>
                    {props.field.label}
                </div>
            </label>
            <textarea
                onChange={e => onChange(e.target.value)}
                value={value || ""}
                placeholder={props.field.placeholderText}
                rows={props.field.settings.rows ? props.field.settings.rows : 4}
                name={props.field.fieldId}
                id={props.field.fieldId}
                className="webiny-fb-form-field__textarea"
            />
            <HelperMessage
                isValid={validation.isValid}
                errorMessage={validation.message}
                helperMessage={props.field.helpText}
            />
        </div>
    );
};
