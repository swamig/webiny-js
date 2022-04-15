import React from "react";
import { validation } from "@webiny/validation";
import { RichTextRenderer } from "@webiny/react-rich-text-renderer";
import { FormRenderPropsType } from "@webiny/app-form-builder/types";
import { BindComponent } from "@webiny/form";
import { HelperMessage } from "./HelperMessage";

interface TermsOfServiceProps {
    Bind: BindComponent;
    TermsOfService: FormRenderPropsType["TermsOfService"];
}

/**
 * Renders the Terms of Service checkbox - which forces the user to agree to our Terms of Service
 * before actually submitting the form.
 * For this we use the provided TermsOfService component, which is a simple render prop component.
 * Note that you don't have to worry if the terms of service option was actually enabled via the Form Editor -
 * the component does necessary checks internally and will not render anything if it isn't supposed to.
 */
const TermsOfServiceCheckbox: React.FC<TermsOfServiceProps> = ({ TermsOfService, Bind }) => {
    return (
        <TermsOfService>
            {({ message, errorMessage, onChange }) => (
                <div className="webiny-fb-form-tos">
                    <Bind
                        name={"tosAccepted"}
                        validators={validation.create("required")}
                        afterChange={onChange}
                    >
                        {({ onChange, value, validation }) => (
                            <div className="webiny-fb-form-field webiny-fb-form-field--checkbox">
                                <div className="webiny-fb-form-field__checkbox-group">
                                    <div className="webiny-fb-form-field__checkbox">
                                        <input
                                            className="webiny-fb-form-field__checkbox-input"
                                            type={"checkbox"}
                                            name="webiny-tos-checkbox"
                                            id="webiny-tos-checkbox"
                                            checked={Boolean(value)}
                                            onChange={() => onChange(!value)}
                                        />
                                        <label
                                            htmlFor={"webiny-tos-checkbox"}
                                            className="webiny-fb-form-field__checkbox-label"
                                        >
                                            <RichTextRenderer data={message} />
                                        </label>
                                    </div>
                                </div>
                                <HelperMessage
                                    isValid={validation.isValid}
                                    errorMessage={errorMessage}
                                />
                            </div>
                        )}
                    </Bind>
                </div>
            )}
        </TermsOfService>
    );
};

export default TermsOfServiceCheckbox;
