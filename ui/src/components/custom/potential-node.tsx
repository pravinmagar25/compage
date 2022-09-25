import React from 'react';
import {getConfig} from "../diagram-maker/helper/config";

interface PotentialNodeProps {
    typeId: string
}

export const PotentialNode = (props: PotentialNodeProps) => {
    let config = getConfig(props.typeId);
    return <React.Fragment>
        <div style={{border: "1px solid black"}} className={config.classNames + " example-node"}>
            {props.typeId}
        </div>
    </React.Fragment>;
}