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

    function setPlotColor(plot) {
        if (plot.vacant === "true") {
            return "#818589";
        } else {
            return "#a9a9a9";
        }
    }

    return (
        <>
        <Card title="Garden Layout" hoverable={false}>
            {GridTestData.map((plot) => (
              <Card.Grid onClick={() => onPlotClick(plot)} style={{background: setPlotColor(plot), width: plot.width}}>
                  {plot.ownerfirstName} {plot.ownerlastName}
              </Card.Grid>
            ))}
        </Card>
        <GridOwnerDisplayModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} plotInfo={plotInfo}/>
        </>
    );
}