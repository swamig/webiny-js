import styled from "@emotion/styled";

export const Card = styled("div")<{ color?: string }>(
    ({ color }) => `
    background: #f4f7fb;
    border-left: 4px solid;
    margin: 16px 0;
    padding: 16px;
    border-color: ${color || "#00aa46"};
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: 400;
    h2 {
        color: #2e2e2e!important;
        font-family: Roboto-Regular!important;
        margin: 8px 0!important;
        font-size: 16px;
        font-weight: 400;
    } 
    h4 {
        color: #2e2e2e;
        font-family: Roboto-Regular;
        font-weight: 400;
        font-size: 14px!important;
        margin: 4px 0;
    }   
    h5 {
        font-family: Roboto-Regular;
        color: #2e2e2e!important;
        font-size: 12px!important;
        font-weight: 600!important;
        line-height: initial;
        margin: 4px 0;
    }
    ul {
        border-top: 0.5px solid #2e2e2e;
        padding: 10px 0 0;
        li {
            width: 50%;
            display: inline-block;
            padding: 5px 0;
        }
    }
    .title {
        font-size: 16px;
        line-height: 22px;
        color: ${color || "#00aa46"};
    }
    .type {
        color: #00aa46;
        border: 1px solid #00aa46;
        font-size: 14px;
        line-height: 22px;
        padding: 1px 12px;
        width: fit-content;
        margin-bottom: 5px;
    }
    .links {
        display: flex;
        margin: 15px 0 0;
        a {
            border-bottom: 1.5px solid #0a7fff;
            color: #00487a;
            display: flex;
            padding: 0 0 5px;
            width: fit-content;
            margin: 0 10px 0 0 !important;
        }
    }
`
);
