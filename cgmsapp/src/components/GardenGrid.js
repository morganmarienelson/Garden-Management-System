import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import {GridTestData} from "../data/GridTestData";

export default function GardenGrid (){
    return (
        <Card title="Garden Display" bordered={false}>
            {GridTestData.map((plot) => (
                <Card.Grid style={{background: plot.color, width: plot.width}}>{plot.name}</Card.Grid>
            ))}
        </Card>
    );
}