import gql from "graphql-tag";

export const GET_CALCULATION_WIZARD_RESULTS = gql`
    query GetCalculationWizardResults {
        netafim {
            getCalculationWizardResults {
                options {
                    primary {
                        type
                        name
                        shortDescription
                        description
                        characteristics {
                            label
                            value
                        }
                        links {
                            label
                            value
                        }
                    }
                    secondary {
                        type
                        shortDescription
                        description
                        characteristics {
                            label
                            value
                        }
                        links {
                            label
                            value
                        }
                    }
                }
            }
        }
    }
`;
