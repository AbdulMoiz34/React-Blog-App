import { useEffect, useState } from "react";
import { Title, Loader } from "../../components";
import { Typography } from "antd";
import { db, getDocs, collection, orderBy, query } from "../../config/firebase";
import { BlogsList } from "../../components";
import { Timestamp } from "firebase/firestore";

interface Blogs {
    userId: string;
    userName: string;
    title: string;
    content: string
    publishedAt: Timestamp;
    id: string;
}

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(() => {
        const getAllBlogs = async () => {
            setLoading(true);
            const q = query(
                collection(db, "blogs"),
                orderBy("publishedAt", "desc")
            );

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                const blog = doc.data() as Blogs;
                setBlogs((prevBlogs) => [...prevBlogs, blog]);
            });
            setLoading(false);
        };

        getAllBlogs();
    }, []);

    return (
        <>
            <Title text="Welcome Readers" />
            <div className="flex justify-center pb-6">
                <div className="w-4/5 flex items-center flex-col py-3">
                    <div className="mt-2 w-full flex flex-col gap-4">
                        <Typography.Title level={2}>All Blogs</Typography.Title>
                        {loading ?
                            (<div className="flex justify-center"><Loader /></div>)
                            : (blogs?.length == 0) ? <div className="text-center">Blogs are not available</div> : <BlogsList blogs={blogs} page="home" />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;