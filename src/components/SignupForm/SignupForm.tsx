import { Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { setDoc, auth, doc, db, createUserWithEmailAndPassword } from "../../config/firebase";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface SignupFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignupForm() {
    const {
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<SignupFormInputs>();

    const [loading, setLoading] = useState(false);
    const password = watch("password");

    const navigate = useNavigate();

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            setLoading(true);

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await setDoc(doc(db, "users", user.uid), {
                userName: `${data.firstName} ${data.lastName}`,
                email: data.email,
                userImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiMobM3dnjg-13GqCOo9EtioNfZ-FXLiU-Ag&s"
            });

            toast.success("User created successfully!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 700);
        } catch (_err) {
            toast.error("Failed to create user");
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
                label="First Name"
                validateStatus={errors.firstName ? "error" : ""}
                help={errors.firstName?.message}
            >
                <Controller
                    name="firstName"
                    control={control}
                    rules={{
                        required: "First name is required",
                        minLength: { value: 3, message: "Minimum 3 characters" },
                        maxLength: { value: 20, message: "Max 20 characters" },
                    }}
                    render={({ field }) => <Input {...field} placeholder="First Name" count={{ show: true, max: 20 }} />} />
            </Form.Item>

            <Form.Item
                label="Last Name"
                validateStatus={errors.lastName ? "error" : ""}
                help={errors.lastName?.message}
            >
                <Controller
                    name="lastName"
                    control={control}
                    rules={{
                        required: "Last name is required",
                        minLength: { value: 1, message: "Minimum 1 character" },
                        maxLength: { value: 20, message: "Max 20 characters" },
                    }}
                    render={({ field }) => <Input {...field} placeholder="Last Name" count={{ show: true, max: 20 }} />} />
            </Form.Item>

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
                        required: "Password is required",
                        minLength: { value: 8, message: "Minimum 8 characters" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                            message: "Must include uppercase and lowercase letters",
                        },
                    }}
                    render={({ field }) => <Input.Password  {...field} placeholder="Password" />} />
            </Form.Item>

            <Form.Item
                label="Repeat Password"
                validateStatus={errors.confirmPassword ? "error" : ""}
                help={errors.confirmPassword?.message}
            >
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ required: "Repeat password is required", validate: (value) => value == password || "Passwords do not match" }}

                    render={({ field }) => <Input.Password {...field} placeholder="Repeat Password" />} />
            </Form.Item>

            <Form.Item>
                <Button
                    className="w-full"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    Sign Up
                </Button>
            </Form.Item>
            <div className="text-center text-sm">
                <span className=" text-gray-700">Already have an account? </span>
                <Link to="/login" className="text-blue-400 ml-1 hover:underline">Login Now</Link>
            </div>
        </Form>
    );
}
