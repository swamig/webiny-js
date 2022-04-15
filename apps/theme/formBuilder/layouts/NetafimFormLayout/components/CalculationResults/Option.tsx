import React from "react";
import { CalculationWizardResultsOption } from "../../types";
import { Card } from "./Card";

export const Option: React.FC<{ option: CalculationWizardResultsOption }> = ({ option }) => {
    return (
        <Card>
            <div className="type">{option.type}</div>
            <h2 style={{ marginBottom: "0 !important" }}>{option.name}</h2>
            <div>{option.description}</div>
            <h4>Drawings and more</h4>
            <ul>
                {option.characteristics.map(item => (
                    <li key={item.label}>
                        {item.label}: <strong>{item.value}</strong>
                    </li>
                ))}
            </ul>
            <br />
            <div>
                <strong>{option.shortDescription}</strong>
            </div>
            <div className="links">
                {option.links.map(item => (
                    <a key={item.label} href={item.value}>
                        {item.label}
                    </a>
                ))}
            </div>
        </Card>
    );
};
