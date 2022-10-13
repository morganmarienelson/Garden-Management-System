import React from 'react';
import 'antd/dist/antd.min.css'
import { Card } from 'antd';
import {GridTestData} from "../data/GridTestData";

export default function GardenGrid (){
    return (
        <Card title="Current Plots" bordered={false}>
            {GridTestData.map((plot) => (
                <Card.Grid style={{background: plot.color, width: plot.width}}>{plot.name}</Card.Grid>
            ))}
        </Card>
    );
}