import React from "react";
import Saving from "./Saving";
import { PbEditorToolbarBottomPlugin } from "~/types";

export default {
    name: "pb-editor-toolbar-save",
    type: "pb-editor-toolbar-bottom",
    renderAction() {
        return <Saving />;
    }
} as PbEditorToolbarBottomPlugin;
