import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogsData, setBlogsData] = useState<
    {
      author: {
        firstName: string;
        lastName?: string;
      };
      content: string;
      id: number;
      published?: boolean;
      thumbnail?: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(res.data.data);
      setBlogsData(res.data.data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-10 px-72 max-2xl:px-48 max-xl:px-24 max-lg:px-16 max-md:px-8 max-sm:px-4">
      <div className="mt-4 flex items-center gap-4 border-b text-base text-stone-500">
        <HiOutlinePlus />
        <p className=" border-b-slate-900 p-4 font-semibold text-stone-900 ">
          For you
        </p>
        <p>Following</p>
      </div>

      <div>
        {blogsData.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
