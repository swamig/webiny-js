import React from "react";
import { validation } from "@webiny/validation";
import { FormRenderPropsType } from "@webiny/app-form-builder/types";
import { BindComponent } from "@webiny/form";
import { HelperMessage } from "./HelperMessage";

interface TermsOfServiceProps {
    Bind: BindComponent;
    ReCaptcha: FormRenderPropsType["ReCaptcha"];
}

/**
 * Renders Google reCAPTCHA field (checkbox) - to protect us from spam and bots.
 * For this we use the provided ReCaptcha component, which is a render prop component and a regular component
 * at the same time, depending if the function was passed as its children. If no children are present, then
 * it will render the actual Google reCAPTCHA field.
 * Note that you don't have to worry if the reCAPTCHA was actually enabled via the Form Editor - the component
 * does necessary checks internally and will not render anything if it isn't supposed to.
 */
const ReCaptchaCheck: React.FC<TermsOfServiceProps> = ({ ReCaptcha, Bind }) => {
    return (
        <ReCaptcha>
            {({ errorMessage }) => (
                <div className="webiny-fb-form-recaptcha">
                    <Bind name={"reCaptcha"} validators={validation.create("required")}>
                        {({ onChange, validation }) => (
                            <>
                                <ReCaptcha onChange={onChange} />
                                <HelperMessage
                                    isValid={validation.isValid}
                                    errorMessage={errorMessage}
                                />
                            </>
                        )}
                    </Bind>
                </div>
            )}
        </ReCaptcha>
    );
};

export default ReCaptchaCheck;
