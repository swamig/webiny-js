import * as React from "react";
import { FbFormModelField } from "@webiny/app-form-builder/types";
import { BindComponentRenderProp } from "@webiny/form";
import { HelperMessage } from "../HelperMessage";

interface InputProps {
    type?: string;
    bind: BindComponentRenderProp;
    field: FbFormModelField;
    fieldIndex: number;
}

export const Input: React.FC<InputProps> = props => {
    const { onChange, value, validation, validate } = props.bind;

    const onBlur = (ev: React.SyntheticEvent) => {
        if (validate) {
            // Since we are accessing event in an async operation, we need to persist it.
            // See https://reactjs.org/docs/events.html#event-pooling.
            ev.persist();
            validate();
        }
    };

    return (
        <div className="webiny-fb-form-field webiny-fb-form-field--input">
            <label className="webiny-pb-typography-body webiny-fb-form-field__label">
                <div className={"field-index-label"}>
                    <div className={"field-index"}>{props.fieldIndex + 1}</div>
                    {props.field.label}
                </div>
            </label>
            <input
                onBlur={onBlur}
                onChange={e => onChange(e.target.value)}
                value={value || ""}
                placeholder={props.field.placeholderText}
                type={props.type}
                name={props.field.fieldId}
                id={props.field.fieldId}
                className="webiny-fb-form-field__input"
            />
            <HelperMessage
                isValid={validation.isValid}
                errorMessage={validation.message}
                helperMessage={props.field.helpText}
            />
        </div>
    );
};

