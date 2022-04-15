import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";
import { Context } from "~/types";

export default new GraphQLSchemaPlugin<Context>({
    typeDefs: /* GraphQL */ `
        type CalculationWizardResultsOptionCharacteristic {
            label: String
            value: String
        }   
        
        type CalculationWizardResultsOptionLink {
            label: String
            value: String
        }

        type CalculationWizardResultsOption {
            name: String
            type: String
            description: String
            shortDescription: String
            characteristics: [CalculationWizardResultsOptionCharacteristic]
            links: [CalculationWizardResultsOptionLink]
        }

        type CalculationWizardResultsOptions {
            primary: [CalculationWizardResultsOption]
            secondary: [CalculationWizardResultsOption]
        }

        type CalculationWizardResults {
            options: CalculationWizardResultsOptions
        }

        type NetafimQuery {
            getCalculationWizardResults: CalculationWizardResults
        }

        extend type Query {
            netafim: NetafimQuery
        }
    `,
    resolvers: {
        NetafimQuery: {
            getCalculationWizardResults: async (page, args, context) => {
                return {
                    options: {
                        primary: [
                            {
                                type: "Disc technology",
                                name: "AlphaDisc™ Disc filter",
                                description:
                                    'AlphaDisc™ Dual XL with 1 filtration unit and 6" inlet/outlet diameter',
                                shortDescription: "Lean & Mean Filtration Machine",
                                characteristics: [
                                    {
                                        label: "Filtration system maximum flow rate",
                                        value: "160.00 m³/h"
                                    },
                                    {
                                        label: "Back-flushing flow rate",
                                        value: "20.00 m³/h"
                                    },
                                    {
                                        label: "Filtration system maximum pressure",
                                        value: "10.00 bar"
                                    },
                                    {
                                        label: "Minimum pressure for back flushing",
                                        value: "1.50 bar"
                                    }
                                ],
                                links: [
                                    {
                                        label: "Learn more about AlphaDisc™ filters",
                                        value: "https://www.netafim.com/en/products-and-solutions/product-offering/filters/disc-filters-alphadisc/"
                                    },
                                    {
                                        label: "Drawing",
                                        value: "https://filterconfig.netafim.com/pdf/Disc_AlphaDisc_Dual_XL.pdf"
                                    }
                                ]
                            }
                        ],
                        secondary: []
                    }
                };
            }
        },
        Query: {
            netafim: () => ({})
        }
    }
});
