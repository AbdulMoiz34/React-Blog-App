import { useContext, useRef, useState } from "react";
import { EditOutlined, CameraOutlined } from "@ant-design/icons";
import AuthContext from "../../context/AuthContext";
import { EditNameModal, Title, UpdatePassword } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";
import { doc, db, updateDoc } from "../../config/firebase";

export default function Profile() {
    const { user } = useContext(AuthContext);

    const fileInpRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<string>(user?.userImage ?? "");
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [name, setName] = useState<string>(user?.userName ?? "Your Name");

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

    const onUpdate = (name: string) => {
        setName(name);
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
                    <input type="file" accept="image/*" className="hidden" ref={fileInpRef} onChange={uploadImage} />
                    <button
                        onClick={handleInputClick}
                        className="absolute bottom-2 w-10 h-10 cursor-pointer right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition"
                        title="Update Image"
                    >
                        <CameraOutlined />
                    </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-xl font-semibold text-gray-800">
                    <span>{name}</span>
                    <button className="text-purple-600 hover:text-purple-800 cursor-pointer" title="Edit Username" onClick={() => setIsEditOpen(true)}>
                        <EditOutlined />
                    </button>
                    <EditNameModal value={name} open={isEditOpen} onCancel={() => setIsEditOpen(false)} onUpdate={onUpdate} />
                </div>
                <UpdatePassword />
            </div>
        </>
    );
}
