import { Form, Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import "./style.css";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { addDoc, collection, db, serverTimestamp } from "../../config/firebase";
import AuthContext from "../../context/AuthContext";

interface PublishBlogFormInputs {
    title: string;
    content: string;
}

const PublishBlogForm = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<PublishBlogFormInputs>();

    const onSubmit = async (data: PublishBlogFormInputs) => {
        try {
            setLoading(true);
            await addDoc(collection(db, "blogs"), { ...data, userId: user?.uid, userName: user?.userName, publishedAt: serverTimestamp() });
            toast.success("Blog published successfully");
        } catch (err) {
            toast.error("Error publishing blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)} className="shadow-lg p-6 rounded-lg">
            <Form.Item
                validateStatus={errors.title ? "error" : ""}
                help={errors.title?.message}
            >
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: "Title can't be empty",
                        minLength: { value: 3, message: "Title must be at least 3 characters" },
                        maxLength: { value: 50, message: "Title cannot exceed 50 characters" },
                        validate: (value) => value.trim().length > 0 || "Title cannot be empty spaces"
                    }}
                    render={({ field }) => (
                        <Input {...field} placeholder="Post Title" count={{ show: true, max: 50 }} />
                    )}
                />
            </Form.Item>

            <Form.Item
                validateStatus={errors.content ? "error" : ""}
                help={errors.content?.message}
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

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Publish Post
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PublishBlogForm;