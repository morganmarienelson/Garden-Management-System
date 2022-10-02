import * as React from 'react';
import {Modal, Button, DatePicker, Popconfirm} from 'antd';
import {useState} from "react";
import 'antd/dist/antd.min.css';
import '../css/openAppBtn.css'
import moment from "moment";
import { useEffect } from "react";
import {Snackbar, Alert} from "@mui/material";

export default function OpenAppBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCloseBtn, setShowCloseBtn] = useState(false);
    const [date, setDate] = useState([]);
    const [tempDate, setTempDate] = useState([]);
    const [checkDate, setCheckDate] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [message, setMessage] = useState("");

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
                if (tempDate.length > 0){
                    setMessage('Application window was not changed.')
                    setAlertType("warning")
                    setAlertOpen(true)
                } else {
                    setMessage('Application window was not set.')
                    setAlertType("warning")
                    setAlertOpen(true)
                }
                setIsOpen(false);
    }

    const onModalOk = () => {
            if (tempDate.length === 0){
                setMessage('Application window was not selected. Please select a valid date range.')
                setAlertType("error")
                setAlertOpen(true)
            } else if (moment().isAfter(tempDate[1])){
                setMessage('The end date must be after the current date. Please select a valid date range.')
                setAlertType("error")
                setAlertOpen(true)
            } else {
                setDate(tempDate);
                let apDate = tempDate[0].format('MM/DD/YYYY') + ", " + tempDate[1].format('MM/DD/YYYY')
                console.log(apDate);
                setMessage("Application window has been set!")
                setAlertType("success")
                setAlertOpen(true)
                setIsOpen(false);
            }
    }

    const selectedDate = (value) => {
        setTempDate(value);
    }

    const confirmClose = () => {
        setMessage("Application has been closed!");
        setAlertType("success")
        setAlertOpen(true)
        setDate([]);
        setIsOpen(false);
    }

    const handleAlertClose = () =>{
        setAlertOpen(false);
    }

    return (
        <div>
            <Button type="primary" className="appBtn" onClick={handleModalOpen}>Set Application Window</Button>
            <Snackbar open={alertOpen} sx={{ width: '100%' }} autoHideDuration={2000} onClose={handleAlertClose}>
                <Alert autohideduration={1} severity={alertType} onClose={handleAlertClose}>
                    {message}
                </Alert>
            </Snackbar>
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