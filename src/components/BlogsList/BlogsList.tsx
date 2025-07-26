import {EditBlogModal , BlogCard} from "../../components"
import { deleteDoc, doc, db, updateDoc , Timestamp } from "../../config/firebase";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useState } from "react";

interface Blogs {
    userId: string;
    userName: string;
    userImage: string;
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

    const [isEditOpen, setIsEditOpen] = useState(false);

    const [blogId, setBlogId] = useState<string>();
    const [blogTitle, setBlogTitle] = useState<string>("");
    const [blogContent, setBlogContent] = useState<string>("");

    const deleteBlogHandler = async (id: string) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Do you really want to delet this blog?",
            okText: "yes, delete it",
            cancelText: "No",
            centered: true,
            onOk: async () => {
                try {
                    await deleteDoc(doc(db, "blogs", id));
                    return toast.success(id + " deleted.");
                } catch (err) {
                    toast.error("something went wrong.");
                }
            },
        })
    }

    const editBlogHandler = (id: string, title: string, content: string) => {
        setBlogId(id);
        setBlogTitle(title);
        setBlogContent(content);
        setIsEditOpen(true);
    }

    const handleUpdateBlog = async (updatedBlog: { title: string; content: string }) => {
        if (!blogId) {
            toast.error("Blog ID is missing.");
            return;
        }
        try {
            await updateDoc(doc(db, "blogs", blogId), {
                content: updatedBlog.content,
                title: updatedBlog.title
            })
            return "updated.";
        } catch (_err) {
            toast.error("something went wrong.");
        }
    }

    return (
        <>
            <div className="mt-2 w-full flex flex-col gap-4">
                {blogs?.map((blog, i) => <BlogCard blog={blog} key={i} deleteBlogHandler={deleteBlogHandler} onEdit={editBlogHandler} page={page} />)}
            </div>

            <EditBlogModal
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                currentTitle={blogTitle}
                currentContent={blogContent}
                onUpdate={handleUpdateBlog}
            />
        </>
    )
}

export default BlogsList;