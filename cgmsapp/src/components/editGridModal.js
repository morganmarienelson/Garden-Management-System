import {Button, Card, Modal} from "antd";
import "../css/gardenGrid.css"
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import {CustomizableGridTestData} from "../data/CustomizableGridTestData";
import EditGridTable from "./editGridTable";

export default function EditGridModal({ isEditModalOpen, setIsEditModalOpen, setPlotColor}) {
    const [showRow, setShowRow] = useState(false);
    const { Option } = Select;

    let lengthOfGrid = 0;
    CustomizableGridTestData.forEach(myFunction);

    function myFunction(object) {
        let length = parseInt(object.dimensions.slice(0,2));
        lengthOfGrid += length;
    }

    const handleOk = () => {
        setIsEditModalOpen(false);
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setShowRow(true);
    };

    function setWidth(dimensions) {
        return (parseInt(dimensions.slice(0,2))/lengthOfGrid * 100) + "%"
    }

    return (
        <Modal title="Edit Grid" open={isEditModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Select style={{ width: 120 }} onChange={handleChange}>
                <Option value="row1">Row 1</Option>
                <Option value="row2">Row 2</Option>
                <Option value="row3">Row 3</Option>
            </Select>
            {showRow ? (
                <>
                <Card title="Row Layout" hoverable={false}>
                    {CustomizableGridTestData.map((plot) => (
                        <Card.Grid style={{background: setPlotColor(plot), width: setWidth(plot.dimensions)}}>
                            {plot.id}
                        </Card.Grid>
                    ))}
                </Card>
                    <EditGridTable/>
                <Button type="primary">Edit Row</Button>
                </>
            ) : (
              <></>
            )}
        </Modal>
    )

}
