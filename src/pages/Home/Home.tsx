import { useEffect, useState } from "react";
import { Title, Loader } from "../../components";
import { Typography } from "antd";
import { db, getDocs, collection, orderBy, query, Timestamp } from "../../config/firebase";
import { BlogsList } from "../../components";

interface Blogs {
    userId: string;
    userName: string;
    title: string;
    content: string
    publishedAt: Timestamp;
    id: string;
    userImage: string;
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
            const blogsData: Blogs[] = querySnapshot.docs.map(doc => doc.data() as Blogs);
            setBlogs(blogsData);
            setLoading(false);
        };

        getAllBlogs();
    }, []);

    const hour = new Date().getHours();
    let text = "";
    if (hour >= 5 && hour < 12) {
        text = "Good Morning!";
    } else if (hour >= 12 && hour < 17) {
        text = "Good Noon!";
    } else if (hour >= 17 && hour <= 20) {
        text = "Good Evening";
    } else {
        text = "Good Night!";
    }

    return (
        <>
            <Title text={text} />
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