import React, {useState} from 'react';
import 'antd/dist/antd.min.css'
import {Button, Card} from 'antd';
import {GridTestData} from "../data/GridTestData";
import GridOwnerDisplayModal from "./gridOwnerDisplayModal";
import EditGridModal from "./editGridModal";

export default function GardenGrid (){
    const [plotInfo, setPlotInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setEditIsModalOpen] = useState(false);

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

    function editGrid() {
        setEditIsModalOpen(true)
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
            <EditGridModal isEditModalOpen={isEditModalOpen} setPlotColor={setPlotColor} setIsEditModalOpen={setIsModalOpen}/>
            <Button type="primary" onClick={editGrid}>Edit Grid</Button>
        </>
    );
}