import * as React from 'react';
import {Modal, Button, Popconfirm} from 'antd';
import {useState} from "react";
import 'antd/dist/antd.min.css'
import '../css/openAppBtn.css'
//import moment from "moment";
import { useEffect } from "react";
import {Snackbar, Alert} from "@mui/material";
import apiClient from '../api/apiClient';
import { TurnedIn } from '@mui/icons-material';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


export default function OpenAppBtn() {
    const [isOpen, setIsOpen] = useState(false);
    const [showCloseBtn, setShowCloseBtn] = useState(false);
    const [tempDate, setTempDate] = React.useState([null, null]);
    const [checkDate, setCheckDate] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [message, setMessage] = useState("");
    const [value, setValue] = React.useState([null, null]);


    useEffect(()=> {
        const getDate = async () => {
            apiClient.get("/v1/applications/get/window")
            .then (res => {
                console.log(res.data);
                const startDate = moment(res.data.startDate).format('MM/DD/YYYY');
                const endDate = moment(res.data.endDate).format('MM/DD/YYYY');
                setValue([startDate, endDate]);
                setTempDate(value);
                setCheckDate(true);
                checkTheDate();
            })
        };
        getDate();

        const checkTheDate = () => {
            if (value.length === 0){
                setShowCloseBtn(false);
            } else if (value[1] < value[0]){
                setValue([null, null]);
                setShowCloseBtn(false);
            }
            else {
                setShowCloseBtn(true);
            }
            setTempDate(value);
            setCheckDate(false);
        };
        checkTheDate();
    }, [isOpen]);

    const handleModalOpen = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
                if (tempDate.length > 0){
                    setMessage('Application window was not changed.');
                    setAlertType("warning");
                    setAlertOpen(true);
                } else {
                    setMessage('Application window was not set.');
                    setAlertType("warning");
                    setAlertOpen(true);
                }
                setIsOpen(false);
    }

    const onModalOk = () => {
        console.log(value);
        const tempStartDate = moment(value[0]).format('MM/DD/YYYY');
        const tempEndDate = moment(value[1]).format('MM/DD/YYYY');
        setValue([tempStartDate, tempEndDate]);
        const headers = {
            startDate: value[0],
            endDate: value[1]
        }
        if (value.length === 0){
            setMessage('Application window was not selected. Please select a valid date range.');
            setAlertType("error");
            setAlertOpen(true);
        } else if (value[1] < value[0]){
            setMessage('The end date must be after the current date. Please select a valid date range.');
            setAlertType("error");
            setAlertOpen(true);
        } else {
            apiClient.put("/v1/applications/put/window", headers)
            .then (res => {
                console.log(res.data);
                setMessage("Application window has been set!");
                setAlertType("success");
                setAlertOpen(true);
                setIsOpen(false);
            }) .error (err => {
                console.log(err);
                setMessage('Application window was not selected. Please select a valid date range.');
                setAlertType("error");
                setAlertOpen(true);
            })
        }
    }

    const selectedDate = (value) => {
        console.log(value);
        setTempDate(value);
    }

    const confirmClose = () => {
        apiClient.delete("/v1/applications/delete/applicationWindow")
        .then (res => {
            console.log(res.data);
            setValue(res.data);
        })
        setMessage("Application has been closed!");
        setAlertType("success");
        setAlertOpen(true);
        setValue([null, null])
        setIsOpen(false);
    }

    const handleAlertClose = () =>{
        setAlertOpen(false);
    }

    return (
        <div>
          <Space direction="vertical" size={12}></Space>
            <Button type="primary" style={{ background: "#7cb342", border: "#7cb342" }} className="appBtn" onClick={handleModalOpen}>Set Application Window</Button>
            <Snackbar open={alertOpen} sx={{ width: '100%' }} autoHideDuration={2000} onClose={handleAlertClose}>
                <Alert autoHideDuration={1} severity={alertType} onClose={handleAlertClose}>
                    {message}
                </Alert>
            </Snackbar>
            <Modal
                onOk={onModalOk}
                open={isOpen}
                onCancel={handleModalClose}
            >
                    {showCloseBtn ? (
                        <div className="modalHeading">Current Application Window</div>
                    ) : (
                        <div className="modalHeading">Select Application Window</div>
                    )}
                    <div className="datePicker">
                        {<LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        localeText={{ start: 'Start Date', end: 'End Date' }}
                        >
                        <DateRangePicker
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                            )}
                        />
                        </LocalizationProvider>}
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
            </Modal>
        </div>
    );
}