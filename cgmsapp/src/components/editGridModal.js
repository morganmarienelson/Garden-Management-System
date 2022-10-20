import {Button, Card, Modal} from "antd";
import "../css/gardenGrid.css"
import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import {CustomizableGridTestData} from "../data/CustomizableGridTestData";

export default function EditGridModal({ isEditModalOpen, setIsEditModalOpen, setPlotColor}) {
    const [showRow, setShowRow] = useState(false);
    const { Option } = Select;

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
                        <Card.Grid style={{background: setPlotColor(plot), width: plot.width}}>
                            {plot.owner}
                        </Card.Grid>
                    ))}
                </Card>
                <Button type="primary">Edit Row</Button>
                </>
            ) : (
              <></>
            )}
        </Modal>
    )

}
