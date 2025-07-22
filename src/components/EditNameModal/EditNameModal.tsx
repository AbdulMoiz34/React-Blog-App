import { Modal, Input, Typography } from "antd";
import { useRef, type RefObject } from "react";

type UpdateNameModalProps = {
    open?: boolean;
    onCancel?: () => void;
    onUpdate?: () => void;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UpdateNameModal: React.FC<UpdateNameModalProps> = ({
    open,
    onCancel,
    onUpdate,
    value,
    onChange,
}) => {


    return (
        <Modal
            okText="Update"
            open={open}
            onCancel={onCancel}
            centered
        >
            <div style={{ padding: "1rem" }}>
                <Typography.Title level={4} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    Update Name
                </Typography.Title>

                <Input
                    ref={inpRef}
                    placeholder="Enter your name"
                    value={value}
                    onChange={onChange}
                    style={{ marginBottom: "1.5rem" }}
                />
            </div>
        </Modal>
    );
};

export default UpdateNameModal;
