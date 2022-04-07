import React from "react";
import { PbPageData } from "@webiny/app-page-builder/types";

interface StaticProps {
    children: React.ReactNode;
    settings: Record<string, any>;
    page: PbPageData;
}

const Static: React.FC<StaticProps> = ({ children }) => {

    return <>{children}</>;
};

export default Static;
