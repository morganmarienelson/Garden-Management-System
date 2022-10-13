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
        if (plot.owner === "Vacant"){
            return "#E5E4E2";
        } else {
            return "#A9A9A9";
        }
    }

    return (
        <>
        <Card title="Garden Layout" hoverable={false}>
            {GridTestData.map((plot) => (
              <Card.Grid onClick={() => onPlotClick(plot)} style={{background: setPlotColor(plot), width: plot.width}}>
                  {plot.owner}
              </Card.Grid>
            ))}
        </Card>
        <GridOwnerDisplayModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} plotInfo={plotInfo}/>
        </>
    );
}