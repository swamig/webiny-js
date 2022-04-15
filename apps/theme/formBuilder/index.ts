import DefaultFormLayout from "./layouts/DefaultFormLayout";
import NetafimFormLayout from "./layouts/NetafimFormLayout";

export default [
    {
        name: "form-layout-default",
        type: "form-layout",
        layout: {
            name: "default",
            title: "Default layout",
            component: DefaultFormLayout
        }
    },
    {
        name: "form-layout-ntfm",
        type: "form-layout",
        layout: {
            name: "netafim",
            title: "Netafim layout",
            component: NetafimFormLayout
        }
    }
];
