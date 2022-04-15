import * as React from "react";
import { FbFormModelField } from "@webiny/app-form-builder/types";
import { BindComponentRenderProp } from "@webiny/form";
import { HelperMessage } from "../HelperMessage";

interface RadioProps {
    bind: BindComponentRenderProp;
    field: FbFormModelField;
    fieldIndex: number;
}

export const Radio: React.FC<RadioProps> = props => {
    const { onChange, value, validation } = props.bind;

    const fieldId = props.field.fieldId;

    return (
        <div className="webiny-fb-form-field webiny-fb-form-field--radio">
            <label className="webiny-fb-form-field__label webiny-pb-typography-body">
                <div className={"field-index-label"}>
                    <div className={"field-index"}>{props.fieldIndex + 1}</div>
                    {props.field.label}
                </div>
            </label>
            <div className="webiny-fb-form-field__radio-group">
                {(props.field.options || []).map(option => {
                    return (
                        <div className="webiny-fb-form-field__radio" key={option.value}>
                            <input
                                checked={value === option.value}
                                onChange={() => onChange(option.value)}
                                name={fieldId}
                                className="webiny-fb-form-field__radio-input"
                                type="radio"
                                id={"radio-" + fieldId + option.value}
                                value={option.value}
                            />
                            <label
                                htmlFor={"radio-" + fieldId + option.value}
                                className="webiny-fb-form-field__radio-label"
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}
            </div>
            <HelperMessage
                isValid={validation.isValid}
                errorMessage={validation.message}
                helperMessage={props.field.helpText}
            />
        </div>
    );
};
