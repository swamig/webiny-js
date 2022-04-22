import { handler } from "~/index";

export const CMS_PROGRAMMATIC_CREATION = /* GraphQL */ `
    mutation CmsProgrammaticCreation {
        cmsProgrammaticCreation
    }
`;

const query = ({ query = "", variables = {} } = {}) => {
    return handler({
        httpMethod: "POST",
        headers: {
            authorization: "xyz"
        },
        body: JSON.stringify({
            query,
            variables
        })
    }).then((response: any) => JSON.parse(response.body));
};

describe("CMS Context API Test", () => {
    it("should be able to use CMS context API", async () => {
        await query({ query: CMS_PROGRAMMATIC_CREATION }).then((response: any) =>
            expect(response).toEqual({})
        );
    });
});
