import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home/Index";
import Login from "../pages/Login/Index";
import CreateAccount from "../pages/CreateAccount";
import Profile from "../pages/Profile";
import SingleVenue from "../pages/SingleVenue";
import PageNotFound from "../components/PageNotFound";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="login" element={<Login />} />
      <Route index element={<Home />} />
      <Route path="create-account" element={<CreateAccount />} />
      <Route path="profile" element={<Profile />} />
      <Route path="venue/:id" element={<SingleVenue />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
