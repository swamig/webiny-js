import * as React from "react";
import { FbFormModelField } from "@webiny/app-form-builder/types";
import { BindComponentRenderProp } from "@webiny/form";
import { HelperMessage } from "../HelperMessage";

interface SelectProps {
    bind: BindComponentRenderProp;
    field: FbFormModelField;
    fieldIndex: number;
}

export const Select: React.FC<SelectProps> = props => {
    const { onChange, value, validation } = props.bind;

    return (
        <div className="webiny-fb-form-field webiny-fb-form-field--select">
            <label className="webiny-fb-form-field__label webiny-pb-typography-body">
                <div className={"field-index-label"}>
                    <div className={"field-index"}>{props.fieldIndex + 1}</div>
                    {props.field.label}
                </div>
            </label>
            <select
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                id={props.field.fieldId}
                name={props.field.fieldId}
                className="webiny-fb-form-field__select"
            >
                <option disabled value={""}>
                    {props.field.placeholderText}
                </option>
                {(props.field.options || []).map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <HelperMessage
                isValid={validation.isValid}
                errorMessage={validation.message}
                helperMessage={props.field.helpText}
            />
        </div>
    );
};
