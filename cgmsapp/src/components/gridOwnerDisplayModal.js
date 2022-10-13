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
            <div className="plotModalInfo"><b>Plot Owner:</b> {plotInfo.name}</div>
            <div className="plotModalInfo"><b>Plot Dimensions:</b> {plotInfo.dimensions}</div>
            <div className="plotModalInfo"><b>Plot Fee:</b> ${plotInfo.feeAmount}</div>
            <div className="plotModalInfo"><b>Additional Info:</b> {plotInfo.other}</div>
        </Modal>
    )

}
