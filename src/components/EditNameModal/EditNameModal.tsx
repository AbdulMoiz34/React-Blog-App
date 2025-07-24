import { Modal, Input, Typography, Form, Button } from "antd";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import { updateDoc, doc, db } from "../../config/firebase";
import "./style.css";

type UpdateNameModalProps = {
    open?: boolean;
    onCancel: () => void;
    onUpdate: (name: string) => void;
    value?: string;
};

interface SignupFormInputs {
    name: string;
}

const UpdateNameModal: React.FC<UpdateNameModalProps> = ({
    open,
    onCancel,
    onUpdate,
    value,
}) => {

    const { user } = useContext(AuthContext);
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
    } = useForm<SignupFormInputs>({ defaultValues: { name: value } });

    const onSubmit = async (data: SignupFormInputs) => {
        if (!user?.uid) return;
        onCancel?.();

        const docRef = doc(db, 'users', user.uid);
        try {
            await toast.promise(updateDoc(docRef, { userName: data.name }), {
                loading: "Saving...",
                success: "Saved.",
                error: "Something went wrong."
            })
            onUpdate(data.name);
        } catch (err) {
            console.log(err);
            toast.error("Failed to update.");
        }
    }

    return (
        <Modal
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            okText="Update"
            open={open}
            onCancel={onCancel}
            centered
        >
            <Form
            className="modal"
                onFinish={handleSubmit(onSubmit)}
            >
                <Typography.Title level={4} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    Update Name
                </Typography.Title>
                <Form.Item
                    validateStatus={errors.name ? "error" : ""}
                    help={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: "First name is required",
                            minLength: { value: 4, message: "Minimum 4 characters" },
                            maxLength: { value: 20, message: "Max 20 characters" },
                        }}
                        render={({ field }) => <Input size="large" placeholder="Name" {...field} count={{ show: true, max: 20 }} />} />
                </Form.Item>
                <Form.Item className="flex justify-end gap-2">
                    <Button type="primary" htmlType="submit" disabled={!isDirty}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default UpdateNameModal;
