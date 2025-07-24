import { useForm, Controller } from "react-hook-form";
import { auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "../../config/firebase";
import { Alert, Button, Input } from "antd";
import toast from "react-hot-toast";

type FormData = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const passwordChecker = (oldPass: string, newPass: string, confirmPass: string): string | undefined => {
    if (!oldPass || !newPass || !confirmPass) return "Fill all fields.";
    if (oldPass === newPass) return "Old and new password cannot be the same.";
    if (newPass.length < 8) return "Password must be at least 8 characters long.";
    if (newPass !== confirmPass) return "Passwords do not match.";
    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(newPass)) return "Must include uppercase and lowercase letters.";
};

export default function UpdatePassword() {
    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {

        const { oldPassword, newPassword, confirmPassword } = data;
        const errorMsg = passwordChecker(oldPassword, newPassword, confirmPassword);
        if (errorMsg) {
            setError("confirmPassword", { message: errorMsg });
            return;
        }

        const user = auth.currentUser;
        if (!user || !user.email) return;

        try {
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            toast.success("Password updated successfully");
            reset();
        } catch (error: any) {
            toast.error("Failed to update.");
            setError("oldPassword", { message: "Your Old password should be correct." });
            console.error("Failed to update password:", error.message);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Controller
                    name="oldPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input.Password
                            {...field}
                            placeholder="Old Password"
                            className="w-full"
                            status={errors.oldPassword ? "error" : ""}
                        />
                    )}
                />
                {errors.oldPassword && <Alert type="error" message={errors.oldPassword.message} showIcon />}

                <Controller
                    name="newPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input.Password
                            {...field}
                            placeholder="New Password"
                            className="w-full"
                            status={errors.newPassword ? "error" : ""}
                        />
                    )}
                />
                {errors.newPassword && <Alert type="error" message={errors.newPassword.message} showIcon />}

                <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input.Password
                            {...field}
                            placeholder="Confirm Password"
                            className="w-full"
                            status={errors.confirmPassword ? "error" : ""}
                        />
                    )}
                />
                {errors.confirmPassword && <Alert type="error" message={errors.confirmPassword.message} showIcon />}

                <Button
                    htmlType="submit"
                    loading={isSubmitting}
                    style={{ backgroundColor: "#8200DB", color: "#fff", padding: "18px 0" }}
                    className="mt-2.5 w-full rounded"
                >
                    {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </div>
    );
}
