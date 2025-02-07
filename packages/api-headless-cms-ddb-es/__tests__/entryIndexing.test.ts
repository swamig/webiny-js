import { PluginsContainer } from "@webiny/plugins";
import indexingPlugins from "~/elasticsearch/indexing";
import { createGraphQLFields } from "@webiny/api-headless-cms";
import { CmsEntry, CmsModel, CmsModelField } from "@webiny/api-headless-cms/types";
import { extractEntriesFromIndex, prepareEntryToIndex } from "~/helpers";

const mockRichTextValue = [
    {
        tag: "p",
        content: "some long text"
    }
];

const createMockField = (
    field: Partial<CmsModelField> & Pick<CmsModelField, "fieldId" | "type">
): CmsModelField => {
    return {
        ...field,
        id: field.fieldId,
        storageId: field.fieldId,
        label: field.fieldId
    };
};

const mockTextValue = "some short searchable text";

const mockModel: Pick<CmsModel, "fields"> = {
    fields: [
        createMockField({
            fieldId: "notAffectedNumber",
            type: "number"
        }),
        createMockField({
            fieldId: "notAffectedString",
            type: "text"
        }),
        createMockField({
            fieldId: "richText",
            type: "rich-text"
        }),
        createMockField({
            fieldId: "text",
            type: "text"
        }),
        createMockField({
            fieldId: "page",
            type: "object",
            settings: {
                fields: [
                    createMockField({
                        fieldId: "title",
                        type: "text"
                    }),
                    createMockField({
                        fieldId: "number",
                        type: "number"
                    }),
                    createMockField({
                        fieldId: "richText",
                        type: "rich-text"
                    }),
                    createMockField({
                        fieldId: "settings",
                        type: "object",
                        settings: {
                            fields: [
                                createMockField({
                                    fieldId: "title",
                                    type: "text"
                                }),
                                createMockField({
                                    fieldId: "snippet",
                                    type: "rich-text"
                                })
                            ]
                        }
                    })
                ]
            }
        })
    ]
};

const mockInputEntry: Partial<CmsEntry> = {
    values: {
        notAffectedNumber: 1,
        notAffectedString: "some text",
        richText: mockRichTextValue,
        text: mockTextValue,
        page: {
            title: "Title",
            number: 155.75,
            richText: [
                {
                    tag: "p",
                    content: "full"
                }
            ],
            settings: {
                title: "Settings Title",
                snippet: [
                    {
                        tag: "p",
                        content: "snippet"
                    }
                ]
            }
        }
    }
};

const mockIndexedEntry: Partial<CmsEntry> & Record<string, any> = {
    values: {
        notAffectedNumber: 1,
        notAffectedString: "some text",
        text: mockTextValue,
        page: {
            title: "Title",
            number: 155.75,
            settings: {
                title: "Settings Title"
            }
        }
    },
    rawValues: {
        richText: mockRichTextValue,
        page: {
            richText: [
                {
                    tag: "p",
                    content: "full"
                }
            ],
            settings: {
                snippet: [
                    {
                        tag: "p",
                        content: "snippet"
                    }
                ]
            }
        }
    }
};

const plugins = new PluginsContainer([...indexingPlugins(), ...createGraphQLFields()]);

describe("entryIndexing", () => {
    test("should prepare entry for indexing", () => {
        const entryToIndex = prepareEntryToIndex({
            entry: mockInputEntry as any,
            storageEntry: mockInputEntry as any,
            model: mockModel as unknown as CmsModel,
            plugins
        });

        expect(entryToIndex).toEqual(mockIndexedEntry);
    });

    test("should extract original entry from indexed data", () => {
        const [entryFromIndex] = extractEntriesFromIndex({
            model: mockModel as unknown as CmsModel,
            plugins,
            entries: [mockIndexedEntry as any]
        });

        expect(entryFromIndex.values).toEqual(mockInputEntry.values);
    });
});
