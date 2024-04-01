import axios from "axios";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogData, setBlogData] = useState<{
    author: {
      firstName: string;
      lastName?: string;
    };
    content: string;
    id: number;
    published?: boolean;
    thumbnail?: string;
    title: string;
  }>({
    author: {
      firstName: "",
      lastName: "",
    },
    content: "",
    id: 0,
    published: false,
    thumbnail: "",
    title: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(res.data.data);
      setBlogData(res.data.data);
    };
    fetchBlogs();
  }, []);

  return <div>Blog</div>;
};

export default Blog;
