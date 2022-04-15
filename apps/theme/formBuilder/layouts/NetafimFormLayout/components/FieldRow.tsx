import styled from "@emotion/styled";

export const FieldRow = styled("div")`
    border-bottom: 1px dashed #bababa;
    display: flex;
    flex-direction: column;
    padding: 24px 0;
    position: relative;
    align-items: center;
    width: 100%;
    .field-index-label {
        display: flex;
        align-items: center;
        .field-index {
            align-items: center;
            border-radius: 15px;
            display: flex;
            height: 24px;
            justify-content: center;
            margin: 0 8px 0 0;
            transition: 0.3s ease-in-out;
            width: 24px;
            background: #dfebfc;
            border: 1.575px solid #dfebfc;
            font-family: Roboto-Regular;
            font-size: 16px;
        }
    }
`;
