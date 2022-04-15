import React, { MouseEventHandler, useCallback, useMemo, useState } from "react";
import {
    BindComponent,
    BindComponentRenderProp,
    Form,
    FormRenderPropParamsSubmit
} from "@webiny/form";
import { FbFormModelField, FormLayoutComponent } from "@webiny/app-form-builder/types";
import { Input, Select, Radio, Checkbox, Textarea } from "./NetafimFormLayout/components/fields";
import { useWizardStepsFields } from "./NetafimFormLayout/useWizardStepsFields";
import {
    WizardSidebar,
    WizardContent,
    FieldRow,
    CalculationResults
} from "./NetafimFormLayout/components";
import TermsOfServiceCheckbox from "./NetafimFormLayout/components/TermsOfServiceCheckbox";
import ReCaptchaCheck from "./NetafimFormLayout/components/ReCaptchaCheck";
import styled from "@emotion/styled";
import { GET_CALCULATION_WIZARD_RESULTS } from "./NetafimFormLayout/graphql";
import { useApolloClient } from "@apollo/react-hooks";
import { CalculationWizardResults } from "./NetafimFormLayout/types";

const WizardLayout = styled("div")`
    background-color: #fff;
    display: flex;
    overflow: hidden;
    min-height: 600px;
    .wizard-buttons {
        display: flex;
        justify-content: space-between;
    }
`;

const WizardButtons = styled("div")`
    display: flex;
    justify-content: space-between;
    text-align: right;
`;

const WizardButton: React.FC<{ loading?: boolean; onClick: MouseEventHandler }> = ({
    loading,
    onClick,
    children
}) => {
    return (
        <button
            className={
                "webiny-fb-form-page-element-button webiny-pb-page-element-button webiny-pb-page-element-button--primary" +
                (loading ? " webiny-pb-element-button--loading" : "")
            }
            onClick={onClick}
            disabled={loading}
        >
            {children}
        </button>
    );
};

/**
 * This is the default form layout component, in which we render all the form fields. We also render terms of service
 * and reCAPTCHA (if enabled in form settings), and at the bottom, the submit button. Note that we also utilized
 * the "webiny-form" package, which makes working with forms and form fields a walk in the park.
 *
 * Feel free to use this component as your starting point for your own form layouts. Add or remove things as you like!
 */
const NetafimFormLayout: FormLayoutComponent = props => {
    const { getFields, getDefaultValues, submit } = props;

    const apolloClient = useApolloClient();

    // Is the form in loading (submitting) state?
    const [loading, setLoading] = useState(false);
    const [currentWizardStepIndex, setCurrentWizardStepIndex] = useState(0);
    const [formSubmission, setFormSubmission] = useState<Record<string, any>>({});
    const [calculationResults, setCalculationResults] = useState<CalculationWizardResults>();

    // All form fields grouped into wizard steps.
    const formFields = getFields();
    const wizardStepsFormFields = useWizardStepsFields(formFields);

    const decrementStep = useCallback(
        () => setCurrentWizardStepIndex(currentWizardStepIndex - 1),
        [currentWizardStepIndex]
    );
    const incrementStep = useCallback(
        () => setCurrentWizardStepIndex(currentWizardStepIndex + 1),
        [currentWizardStepIndex]
    );

    const isStepBeforeResults = useMemo(() => {
        return currentWizardStepIndex === wizardStepsFormFields.length - 2;
    }, [currentWizardStepIndex]);

    const isResultsStep = useMemo(() => {
        return currentWizardStepIndex === wizardStepsFormFields.length - 1;
    }, [currentWizardStepIndex]);

    /**
     * Once the data is successfully submitted, we show a success message.
     */
    const onFormSubmit = async (formSubmission: Record<string, any>): Promise<void> => {
        if (isStepBeforeResults) {
            setLoading(true);
            setFormSubmission(formSubmission);
            const result = await submit(formSubmission);
            if (!result.error) {
                const calculationResults: CalculationWizardResults = await apolloClient
                    .query({ query: GET_CALCULATION_WIZARD_RESULTS })
                    .then(results => results.data.netafim.getCalculationWizardResults);
                setCalculationResults(calculationResults);
            }
            setLoading(false);
        }
        incrementStep();
    };

    /**
     * Renders a single form field. You can add additional handling of other field types if needed.
     * All of these components are located in the "./fields" folder.
     */
    const renderFormField = (props: {
        field: FbFormModelField;
        fieldIndex: number;
        bind: BindComponentRenderProp;
    }) => {
        switch (props.field.type) {
            case "text":
                return <Input {...props} />;
            case "textarea":
                return <Textarea {...props} />;
            case "number":
                return <Input {...props} type="number" />;
            case "select":
                return <Select {...props} />;
            case "radio":
                return <Radio {...props} />;
            case "checkbox":
                return <Checkbox {...props} />;
            case "hidden":
                return <input type="hidden" value={props.bind.value} />;
            default:
                return <span>Cannot render field.</span>;
        }
    };

    const renderWizardStepFields = (Bind: BindComponent) => {
        return wizardStepsFormFields[currentWizardStepIndex].rows.map((row, rowIndex) => (
            <div key={rowIndex}>
                {row.map(field => (
                    <FieldRow key={field.fieldId}>
                        <Bind name={field.fieldId} validators={field.validators}>
                            {bind =>
                                renderFormField({
                                    field,
                                    fieldIndex: rowIndex,
                                    bind
                                })
                            }
                        </Bind>
                    </FieldRow>
                ))}
            </div>
        ));
    };

    const renderLeftButton = useCallback(() => {
        if (currentWizardStepIndex > 0) {
            return <WizardButton onClick={decrementStep}>Previous</WizardButton>;
        }
        return null;
    }, [currentWizardStepIndex]);

    const renderRightButton = useCallback(
        ({ submit, loading }: { submit: FormRenderPropParamsSubmit; loading: boolean }) => {
            if (isResultsStep) {
                return (
                    <WizardButton
                        onClick={() => window.open("https://www.netafim.com/en/", "_blank")}
                    >
                        Contact Netafim
                    </WizardButton>
                );
            }

            return (
                <WizardButton loading={loading} onClick={submit}>
                    {isStepBeforeResults ? "Results" : "Next"}
                </WizardButton>
            );
        },
        [currentWizardStepIndex]
    );

    return (
        /* "onSubmit" callback gets triggered once all of the fields are valid. */
        /* We also pass the default values for all fields via the getDefaultValues callback. */
        <Form onSubmit={onFormSubmit} data={getDefaultValues()}>
            {({ submit, Bind }) => (
                <>
                    {/* Let's render all form fields as a wizard. */}
                    <WizardLayout>
                        <WizardSidebar
                            wizardStepsFields={wizardStepsFormFields}
                            currentStepIndex={currentWizardStepIndex}
                        />
                        <WizardContent
                            wizardStepsFields={wizardStepsFormFields}
                            currentStepIndex={currentWizardStepIndex}
                        >
                            {isResultsStep ? (
                                <CalculationResults
                                    results={calculationResults!}
                                    formFields={formFields}
                                    formSubmission={formSubmission}
                                />
                            ) : (
                                renderWizardStepFields(Bind)
                            )}
                        </WizardContent>
                    </WizardLayout>

                    {/* At the bottom of the Form, we render the terms of service,
                        the reCAPTCHA field and the submit button. */}
                    <TermsOfServiceCheckbox Bind={Bind} TermsOfService={props.TermsOfService} />
                    <ReCaptchaCheck Bind={Bind} ReCaptcha={props.ReCaptcha} />

                    <WizardButtons>
                        <div>{renderLeftButton()}</div>
                        <div>{renderRightButton({ submit, loading })}</div>
                    </WizardButtons>
                </>
            )}
        </Form>
    );
};

export default NetafimFormLayout;
