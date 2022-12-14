import {Modal} from "antd";
import "../css/gardenGrid.css"

export default function GridOwnerDisplayModal({ isModalOpen, setIsModalOpen, plotInfo}) {

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Plot Information" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className="plotModalInfo"><b>Owner:</b> {plotInfo.firstName} {plotInfo.lastName}</div>
            <div className="plotModalInfo"><b>Dimensions:</b> {plotInfo.size}</div>
            <div className="plotModalInfo"><b>Fee:</b> ${plotInfo.feeAmount}</div>
        </Modal>
    )

}
