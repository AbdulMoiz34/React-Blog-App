import { useContext, useEffect, useState } from "react";
import { BlogsList, Loader, PublishBlogForm, Title } from "../../components";
import { query, collection, db, where, orderBy, onSnapshot } from "../../config/firebase";
import AuthContext from "../../context/AuthContext";
import { Typography } from "antd";
import type { Timestamp } from "firebase/firestore";

interface Blogs {
    userId: string;
    userName: string;
    title: string;
    content: string
    publishedAt: Timestamp;
    id: string;
    userImage: string;
}

const Dashboard = () => {
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user?.uid) return;
        setLoading(true);

        const q = query(
            collection(db, "blogs"),
            where("userId", "==", user?.uid),
            orderBy("publishedAt", "desc")
        );

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const blogList: Blogs[] = [];
                querySnapshot.forEach((doc) => {
                    blogList.push({ ...doc.data(), id: doc.id } as Blogs);
                });
                setBlogs(blogList);
                setLoading(false);
            },
            () => {
                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <>
            <Title text="Dashboard" />
            <PublishBlogForm />
            <div className="flex justify-center">
                <div className="w-4/5 flex items-center flex-col py-3">
                    <Typography.Title level={2}>My Blogs</Typography.Title>
                    <div className="mt-2 w-full flex flex-col gap-4">
                        {loading ?
                            (<div className="flex justify-center"><Loader /></div>)
                            : (blogs?.length == 0) ? <div className="text-center">Blogs are not available</div> :
                                <BlogsList page="myblogs" blogs={blogs} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;