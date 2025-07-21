// import Typography from "@mui/material/Typography";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderBy, Timestamp } from "firebase/firestore";
import { getDocs, collection, db, query, where, getDoc, doc } from "../../config/firebase";
import { Loader, BlogsList } from "../../components";
import toast from "react-hot-toast";
import Image from "../../assets/2a700436ad923e69a8ff7debe812a1b55f9e2cca.jpg";

interface Blogs {
    userId: string;
    userName: string;
    title: string;
    content: string
    publishedAt: Timestamp;
    id: string;
}

interface User {
    email: string;
    userName: string;
}

const UserBlogsPage = () => {
    const navigate = useNavigate();
    const navigateHandler = () => navigate("/");

    const params = useParams();
    const userId = params?.userId ?? "";
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getBlogs = async () => {
            setLoading(true);

            try {
                const docSnap = await getDoc(doc(db, "users", userId));
                setUser(docSnap.data() as User);
                const q = query(
                    collection(db, "blogs"),
                    where("userId", "==", userId),
                    orderBy("publishedAt", "desc")
                );
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach(doc => {
                    const blog = doc.data() as Blogs;
                    setBlogs((prevBlogs) => [...prevBlogs, blog]);
                });
            } catch (_err) {
                toast.error("something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        getBlogs();
    }, []);

    return (
        <>
            <div className='bg-[#F8F9FA] py-4'>
                <Button onClick={navigateHandler}>
                    <Typography variant='h4' ml={3} fontFamily={'monospace'}>
                        &lt;Back to all blogs
                    </Typography>
                </Button>
            </div>
            <div className="flex justify-center bg-[#F8F9FA]">
                <div className="w-[90%] flex gap-8 mt-4 justify-start items-start">
                    <div className="flex flex-col w-full">
                        {loading ?
                            (<div className="flex justify-center"><Loader /></div>)
                            : (blogs?.length == 0) ?
                                <div className="text-center">Blogs are not available</div> :
                                <>
                                    <Typography variant="h5">All from {user?.userName}</Typography>
                                    <BlogsList blogs={blogs} />
                                </>}
                    </div>
                    {!loading && <div className="flex flex-col items-end mt-14">
                        <a href={`mailto:${user?.email}`} className="text-xl">{user?.email}</a>
                        <Typography variant="h4" color="#1976D2" className="font-extrabold">{(user?.userName && user?.userName?.length >= 10) ? user.userName.slice(0, 10) + "..." : user?.userName}</Typography>
                        <img src={Image} alt="" className="w-72 rounded-lg" />
                    </div>}
                </div>
            </div>
        </>
    );
}


export default UserBlogsPage;