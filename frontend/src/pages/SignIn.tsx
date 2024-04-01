import Auth from "../components/Auth";
import Quote from "../components/Quote";

const SignUp = () => {
  return (
    <div className="grid  h-screen  w-full font-sans lg:grid-cols-2 lg:grid-rows-1">
      <Auth type="signin" />
      <Quote />
    </div>
  );
};

export default SignUp;
