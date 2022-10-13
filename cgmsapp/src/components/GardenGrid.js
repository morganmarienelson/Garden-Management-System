import React, {useState} from 'react';
import 'antd/dist/antd.min.css'
import { Card } from 'antd';
import {GridTestData} from "../data/GridTestData";
import GridOwnerDisplayModal from "./gridOwnerDisplayModal";

export default function GardenGrid (){
    const [plotInfo, setPlotInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);


    function onPlotClick(plot) {
        setPlotInfo(plot);
        setIsModalOpen(true);
    }

    return (
        <>
        <Card title="Current Plots" hoverable={false}>
            {GridTestData.map((plot) => (
              <Card.Grid onClick={() => onPlotClick(plot)} style={{background: plot.color, width: plot.width}}>
                  {plot.name}
              </Card.Grid>
            ))}
        </Card>
        <GridOwnerDisplayModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} plotInfo={plotInfo}/>
        </>
    );
}