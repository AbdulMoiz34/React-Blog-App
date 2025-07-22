import { Typography } from "antd";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface Blog {
    title: string;
    content: string;
    userId: string;
    userName: string;
    publishedAt: Timestamp;
    id: string;
    userImage: string;
}

interface BlogCardProps {
    deleteBlogHandler: (id: string) => {};
    page?: string;
    blog: Blog;
    onEdit: (id: string, title: string, content: string) => void;
}


const BlogCard = ({ blog, deleteBlogHandler, onEdit, page }: BlogCardProps) => {
    const { title, content, userId, userName, userImage, publishedAt, id } = blog;
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
                    <img src={userImage} className="w-full h-full rounded-2xl" />
                </div>
                <div className="md:w-2/4 text-center sm:text-left">
                    <Typography.Title level={4} style={{ margin: "0px" }}>{title}</Typography.Title>
                    <p className="text-[#6C757D] text-xs">{userName} - {formattedDate}</p>
                </div>
            </div>
            <div className="mt-4">
                <div>
                    <Typography.Text style={{whiteSpace: "pre-line"}}>{content} </Typography.Text>
                </div>
                {page == "home" &&
                    <Link to={`/blogs/${userId}`}>
                        <button className="text-purple-700 cursor-pointer hover:underline text-sm mt-2">see all blogs from this user</button>
                    </Link>}

                {page == "myblogs" &&
                    <div className="mt-2">
                        <button className="text-purple-700 cursor-pointer hover:text-black text-sm mr-2.5" onClick={() => deleteBlogHandler(id)}>Delete</button>
                        <button className="text-purple-700 cursor-pointer hover:text-black text-sm" onClick={() => onEdit(id, title, content)}>Edit</button>
                    </div>}
            </div>
        </div>
    );
}

export default BlogCard;