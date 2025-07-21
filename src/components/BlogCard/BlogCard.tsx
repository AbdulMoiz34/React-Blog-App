import { Typography } from "antd";
import Image from "../../assets/1b3b56a2e20173af0ea8ed56018187f04a18c768.jpg";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
interface BlogCardProps {
    title: string;
    content: string;
    userId: string;
    userName: string;
    publishedAt: Timestamp;
    id: string;
    deleteBlogHandler: (id: string) => {};
    viewAll?: string
}


const BlogCard = ({ title, content, userId, userName, publishedAt, id, deleteBlogHandler, viewAll }: BlogCardProps) => {

    let formattedDate = "Loading...";
    if (publishedAt) {
        try {
            formattedDate = format(publishedAt?.toDate(), "MMMM do, yyyy");
        } catch (_err: any) {
            toast.error("something went wrong.");
        }
    }

    return (
        <div className="w-full p-4 bg-white rounded-md border-1 border-[#DEE2E6]">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 items-center">
                <div className="w-20">
                    <img src={Image} className="w-full h-full rounded-2xl" />
                </div>
                <div className="md:w-2/4 text-center sm:text-left">
                    <Typography.Title level={4} style={{ margin: "0px" }}>{title}</Typography.Title>
                    <p className="text-[#6C757D] text-xs">{userName} - {formattedDate || "Loading..."}</p> {/*August 16th, 2023*/}
                </div>
            </div>
            <div className="mt-4">
                <div>
                    <Typography.Text>{content} </Typography.Text>
                </div>
                {viewAll == "home" &&
                    <Link to={`/blogs/${userId}`}>
                        <button className="text-purple-700 cursor-pointer hover:underline text-sm mt-2">see all blogs from this user</button>
                    </Link>}

                {viewAll == "myblogs" &&
                    <div className="mt-2">
                        <button className="text-purple-700 cursor-pointer hover:text-black text-sm mr-2.5" onClick={() => deleteBlogHandler(id)}>Delete</button>
                        <button className="text-purple-700 cursor-pointer hover:text-black text-sm">Edit</button>
                    </div>}
            </div>
        </div>
    );
}

export default BlogCard;