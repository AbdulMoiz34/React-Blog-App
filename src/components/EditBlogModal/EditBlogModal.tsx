import { useEffect } from "react";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import "./style.css";
import toast from "react-hot-toast";

interface EditBlogModalProps {
    open: boolean;
    onClose: () => void;
    onUpdate?: (updatedBlog: { title: string; content: string }) => Promise<string | undefined>;
    currentTitle?: string;
    currentContent?: string;
}

interface EditBlogFormsInput {
    title: string;
    content: string;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({
    open,
    onClose,
    currentTitle = "",
    currentContent = "",
    onUpdate
}) => {
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors, isDirty }
    } = useForm<EditBlogFormsInput>({
        defaultValues: {
            title: currentTitle,
            content: currentContent
        }
    });


    useEffect(() => {
        if (open) {
            reset({ title: currentTitle, content: currentContent });
        }

    }, [currentTitle, currentContent, open, reset]);

    const handleUpdate = async (data: EditBlogFormsInput) => {
        if (onUpdate && isDirty) {
            onClose();
            toast.promise(
                onUpdate(data),
                {
                    loading: 'Update...',
                    success: <b>Updated!</b>,
                    error: <b>Something went wrong.</b>,
                }
            );
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <Form onFinish={handleSubmit(handleUpdate)} className="edit" layout="vertical">
                <DialogTitle className="text-center">Edit Blog</DialogTitle>
                <Form.Item
                    validateStatus={errors.title ? "error" : ""}
                    help={errors.title?.message}
                    label="Title"
                >
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            required: "Title can't be empty",
                            minLength: { value: 3, message: "Minimum 3 characters" },
                            maxLength: { value: 50, message: "Max 50 characters allowed" },
                            validate: (value) => value.trim().length > 0 || "Title cannot be empty spaces"
                        }}
                        render={({ field }) => (
                            <Input {...field} placeholder="Post Title" showCount maxLength={50} />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    validateStatus={errors.content ? "error" : ""}
                    help={errors.content?.message}
                    label="Content"
                >
                    <Controller
                        name="content"
                        control={control}
                        rules={{
                            required: "Content can't be empty",
                            minLength: { value: 100, message: "Content must be at least 100 characters" },
                            maxLength: { value: 3000, message: "Content cannot exceed 3000 characters" },
                            validate: (value) => value.trim().length > 0 || "Content cannot be empty spaces"
                        }}
                        render={({ field }) => (
                            <Input.TextArea
                                {...field}
                                rows={4}
                                placeholder="Post Content"
                                count={{ show: true, max: 3000 }}
                            />
                        )}
                    />
                </Form.Item>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" htmlType="submit" disabled={!isDirty}>
                        Update
                    </Button>
                </DialogActions>
            </Form>
        </Dialog>
    );
};

export default EditBlogModal;