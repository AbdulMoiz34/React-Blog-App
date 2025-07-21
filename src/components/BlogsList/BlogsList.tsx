import { Timestamp } from "firebase/firestore";
import BlogCard from "../BlogCard";
import { deleteDoc, doc, db } from "../../config/firebase";
import toast from "react-hot-toast";

interface Blogs {
    userId: string;
    userName: string;
    title: string;
    content: string
    publishedAt: Timestamp;
    id: string;
}

interface BlogsProps {
    blogs: Blogs[];
    page?: string
}

const BlogsList = ({ blogs, page }: BlogsProps) => {

    const deleteBlogHandler = async (id: string) => {
        const conf = confirm("do u really want to delete this one.");
        if (conf) {
            try {
                await deleteDoc(doc(db, "blogs", id));
                return toast.success(id + " deleted.");
            } catch (error: unknown) {
                toast.error("something went wrong.");
            }
        }
    }

    return (
        <div className="mt-2 w-full flex flex-col gap-4">
            {blogs?.map((blog, i) => <BlogCard {...blog} key={i} deleteBlogHandler={deleteBlogHandler} viewAll={page} />)}
        </div>
    )
}

export default BlogsList;