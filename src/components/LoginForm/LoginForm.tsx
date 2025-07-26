import { Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../config/firebase";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Logged in successfully!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 700);
        } catch (_err) {
            toast.error("Failed to Login");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
        >
            <Form.Item
                label="Email"
                validateStatus={errors.email ? "error" : ""}
                help={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    }}
                    render={({ field }) => <Input {...field} type="email" placeholder="Email" />} />
            </Form.Item>

            <Form.Item
                label="Password"
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
            >
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: "Password is required"
                    }}
                    render={({ field }) => <Input.Password  {...field} placeholder="Password" />} />
            </Form.Item>

            <Form.Item>
                <Button
                    className="w-full"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    Login
                </Button>
            </Form.Item>
            <div className="text-center text-sm">
                <span className=" text-gray-700">Don't have an account?</span>
                <Link to="/signup" className="text-blue-400 ml-1">Signup Now</Link>
            </div>
        </Form>
    );
}

export default LoginForm;