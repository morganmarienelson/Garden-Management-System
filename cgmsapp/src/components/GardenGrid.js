import React, {useState} from 'react';
import 'antd/dist/antd.min.css'
import { Card } from 'antd';
import {GridTestData} from "../data/GridTestData";
import apiClient from "../api/apiClient";
import {useEffect} from "react";
import GridOwnerDisplayModal from "./gridOwnerDisplayModal";

export default function GardenGrid (){
    const [plotInfo, setPlotInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gardener, setGardener] = useState([]);
    const [plots, setPlots] = useState([]);

    useEffect(() => {
        apiClient.get("/v1/plots/get/all")
          .then (res => {
          setPlots(res.data);
      })
      }, []);
    
      useEffect(() => {
        plots.map((ploting) => {
          if (ploting.memberId !== 0) {
            apiClient.get(`/v1/members/get-by-member/${ploting.memberId}`)
              .then((res) => {
                setGardener((gardener) => [...gardener, {firstName: res.data.firstName, lastName: res.data.lastName, vacant: "false", memberId: ploting.memberId, plotId: ploting.plotId, size: ploting.size, feeAmount: ploting.feeAmount }]);
              })
          } else  if (ploting.memberId === 0){
            setGardener((gardener) => [...gardener, {firstName: "-----", lastName: "-----", vacant: "true", memberId: ploting.memberId, plotId: ploting.plotId, size: ploting.size, feeAmount: ploting.feeAmount }]);
          }
        })
      }, [plots]);

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
            {gardener.map((plot) => (
              <Card.Grid onClick={() => onPlotClick(plot)} style={{background: setPlotColor(plot), width: plot.width}}>
                  {plot.firstName} {plot.lastName}
              </Card.Grid>
            ))}
        </Card>
        <GridOwnerDisplayModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} plotInfo={plotInfo}/>
        </>
    );
}