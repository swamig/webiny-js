import { Context } from "~/types";
import { ContextPlugin } from "@webiny/handler";
import { GraphQLSchemaPlugin } from "@webiny/handler-graphql/plugins";

export default () => {
    return [
        new ContextPlugin<Context>(context => {
            context.security.addAuthenticator(async () => {
                return {
                    id: "12345678",
                    type: "admin",
                    displayName: "John Doe"
                };
            });

            context.security.addAuthorizer(async () => {
                return [{ name: "*" }];
            });
        }),
        new GraphQLSchemaPlugin<Context>({
            typeDefs: /* GraphQL */ `
                extend type Mutation {
                    cmsProgrammaticCreation: Boolean
                }
            `,
            resolvers: {
                Mutation: {
                    cmsProgrammaticCreation: async (_, __, ctx) => {
                        const ts = new Date().getTime();
                        const bb = ctx;

                        try {
                            const group = await bb.cms.createGroup({
                                name: `test-cmg-${ts}`,
                                slug: `test-cmg-${ts}`,
                                description: "test",
                                icon: "x-smt"
                            });

                            const model = await bb.cms.createModel({
                                name: `test-cm-${ts}`,
                                description: "description",
                                group: group.id
                            });
                            return true;
                        } catch (e) {
                            console.log(e);
                            return false;
                        }
                    }
                }
            }
        })
    ];
};
