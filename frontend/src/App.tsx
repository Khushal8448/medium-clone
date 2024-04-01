import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Blogs from "./pages/Blogs";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
