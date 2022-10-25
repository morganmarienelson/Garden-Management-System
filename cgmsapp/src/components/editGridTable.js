import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Space, Table, Tag } from 'antd';
import {CustomizableGridTestData} from "../data/CustomizableGridTestData";
import { InputNumber } from 'antd';

const { Column } = Table;

interface DataType {
    key: React.Key;
    dimensions: string;
}

export default function EditGridTable() {
    const [editRecord, setEditRecord ] = useState(null);
    const onChange = (value: number, record) => {
        console.log('changed', value);
        setEditRecord(record);
        //Do update API Request
    };

    return (
        <Table dataSource={CustomizableGridTestData}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column
                title="Length"
                key="length"
                render={(_: any, record: DataType) => (
                    <Space size="middle">
                        <InputNumber defaultValue={record.dimensions.slice(0,2)} onChange={onChange(record)} />
                    </Space>
                )}
            />
        </Table>

    )
}