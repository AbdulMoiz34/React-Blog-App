import { useContext, useRef, useState } from "react";
import { EditOutlined, CameraOutlined } from "@ant-design/icons";
import AuthContext from "../../context/AuthContext";
import { EditNameModal, Title } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import { doc, db, updateDoc } from "../../config/firebase";

export default function Profile() {
    const { user } = useContext(AuthContext);

    const fileInpRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string>(user?.userImage ?? "");
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleInputClick = () => fileInpRef?.current?.click();

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user?.uid) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "a12311");
        formData.append("folder", "blog-images");


        const url = "https://api.cloudinary.com/v1_1/moiz34/image/upload";

        try {
            const res = await toast.promise(axios.post(url, formData), {
                loading: "Uploading...",
                success: "Sucessfully uploaded.",
                error: "Failed to upload.",
            })

            await updateDoc(doc(db, "users", user?.uid), {
                userImage: res.data.secure_url
            })
            setImage(res.data.secure_url);

        } catch (err) {
            toast.error("something went wrong.");
        }
    }

    return (
        <>
            <Title text="Profile" />
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg space-y-6">
                <div className="relative w-40 h-40 mx-auto">
                    <img
                        src={image}
                        alt="Your Image"
                        className="w-full h-full object-cover rounded-full border-4 border-purple-300"
                    />
                    <input type="file" className="hidden" ref={fileInpRef} onChange={uploadImage} />
                    <button
                        onClick={handleInputClick}
                        className="absolute bottom-2 w-10 h-10 cursor-pointer right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
                        title="Update Image"
                    >
                        <CameraOutlined />
                    </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xl font-semibold text-gray-800">
                    <span>{user?.userName || "Your Username"}</span>
                    <button className="text-purple-600 hover:text-purple-800 cursor-pointer" title="Edit Username" onClick={() => setIsEditOpen(true)}>
                        <EditOutlined />
                    </button>
                    <EditNameModal value={user?.userName ?? ""} open={isEditOpen} onCancel={() => setIsEditOpen(false)} />
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-700">Password</h2>
                    <input
                        type="password"
                        placeholder="Old Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button className="cursor-pointer w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                        Update Password
                    </button>
                </div>
            </div>
        </>
    );
}
