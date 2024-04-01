import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";
interface BlogCardProps {
  blog: {
    author: {
      firstName: string;
      lastName?: string;
    };
    content: string;
    id: number;
    published?: boolean;
    thumbnail?: string;
    title: string;
  };
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="mb-2 grid grid-cols-5 border-b px-4 pb-8 pt-4 ">
        <div className="col-span-4">
          <div className="mb-2 flex items-center">
            <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 text-[12px] font-semibold text-white">
              {blog.author.firstName[0].toUpperCase()}
              {blog.author.lastName && blog.author.lastName[0].toUpperCase()}
            </span>
            <h6 className="text-base font-semibold">
              {blog.author.firstName} {blog.author.lastName}
            </h6>
            <LuDot color="#888" />
            <h6 className="text-slate-600">Nov 1, 2003</h6>
          </div>
          <div className="text-2xl font-bold">{blog.title}</div>
          <div className="">{blog.content.slice(0, 150) + "..."}</div>
          <div className="text-sm text-slate-600">
            {Math.ceil(blog.content.length / 100)} min Read
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
