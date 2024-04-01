import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <div className="flex items-center justify-between border-b px-4">
        <div>
          <Link to="/blogs">
            <img
              width={60}
              className="cursor-pointer object-cover"
              src="../../public/Medium_logo_-_black-512.webp"
              alt="Logo"
            />
          </Link>
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
          K
        </span>
      </div>
      <Outlet />
    </>
  );
};

export default AppLayout;
