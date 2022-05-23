import React from "react";
import { Admin } from "@webiny/app-wcp";
import { Cognito } from "@webiny/app-admin-users-cognito";
import { ApwAdmin } from "@webiny/app-apw/plugins";
import { TenantManager } from "@webiny/app-tenant-manager";
import "./App.scss";

export const App = () => {
    return (
        <Admin>
            <Cognito />
            <ApwAdmin />
            <TenantManager />
        </Admin>
    );
};
