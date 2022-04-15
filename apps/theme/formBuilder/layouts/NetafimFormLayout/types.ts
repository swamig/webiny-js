export interface CalculationWizardResultsOption {
    name: string;
    type: string;
    description: string;
    shortDescription: string;
    characteristics: Array<{ label: string; value: string }>;
    links: Array<{ label: string; value: string }>;
}

export interface CalculationWizardResults {
    options: {
        primary: CalculationWizardResultsOption[];
        secondary: CalculationWizardResultsOption[];
    };
}
