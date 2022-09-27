import * as React from 'react';
import {Modal, Button, DatePicker, message, Popconfirm} from 'antd';
import {useState} from "react";
import 'antd/dist/antd.css'
import '../css/openAppBtn.css'
import moment from "moment";
import { useEffect } from "react";

export default function OpenAppBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCloseBtn, setShowCloseBtn] = useState(false);
    const [date, setDate] = useState([]);
    const [tempDate, setTempDate] = useState([]);
    const [checkDate, setCheckDate] = useState(false);

    useEffect(() => {
        const checkTheDate = async () => {
            if (checkDate){
                if (date.length === 0){
                    setShowCloseBtn(false);
                } else if (moment().isAfter(date[1])){
                    setDate([]);
                    setShowCloseBtn(false)
                }
                else {
                    setShowCloseBtn(true);
                }
            }
            setTempDate(date);
            setCheckDate(false);
        }
        checkTheDate();
    }, [checkDate, date]);

    const handleModalOpen = () => {
        setCheckDate(true);
        setIsOpen(true);
    }

    const handleModalClose = () => {
                if (date.length > 0){
                    message.warning('Application window was not changed');
                } else {
                    message.warning('Application window was not set');
                }
                setIsOpen(false);
    }

    const onModalOk = () => {
        if (tempDate.length > 0 && tempDate[1].isAfter(moment())
        ){
            setDate(tempDate);
            message.success('Application window set');
            setIsOpen(false);
        } else {
            if (tempDate.length === 0){
                message.error('Application window was not selected. Please select a valid range');
            } else {
                message.error('The end date must be after the current date');
            }
        }
    }

    const selectedDate = (value) => {
        setTempDate(value);
    }

    const confirmClose = () => {
        message.success('Application has been closed');
        setDate([]);
        setIsOpen(false);
    }

    const cancelClose = () => {
        message.error('Application was not closed');
    }


    return (
        <div>
            <Button type="primary" className="appBtn" onClick={handleModalOpen}>Application Window</Button>
            <Modal
                onOk={onModalOk}
                open={isOpen}
                onCancel={handleModalClose}
            >
                <div className="modal">
                    {showCloseBtn ? (
                        <div className="modalHeading">Current Application Window</div>
                    ) : (
                        <div className="modalHeading">Select Application Window</div>
                    )}
                    <div className="datePicker">
                        <DatePicker.RangePicker
                            allowClear={false}
                            value={tempDate}
                            size={"large"}
                            onChange={selectedDate}
                        />

                        {showCloseBtn ? (
                            <>
                                <div>
                                    <Popconfirm
                                        title="Are you sure to close this application?"
                                        onConfirm={confirmClose}
                                        onCancel={cancelClose}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button className="closeAppBtn" type="primary" danger>Close Application</Button>
                                    </Popconfirm>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}

                    </div>
                </div>
            </Modal>
        </div>
    );
}