import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import AddStoryPage from "../pages/addStory/add-story-page";
import LoginPage from "../pages/login/login-page";
import RegistPage from "../pages/register/regist-page";
import LogoutPage from "../pages/logout/logout-page";
import BookmarkPage from "../pages/bookmark/bookmark-page";

const routes = {
  "/": HomePage,
  "/about": new AboutPage(),
  "/add-story": AddStoryPage,
  "/login": LoginPage,
  "/regist": RegistPage,
  "/logout": LogoutPage,
  "/bookmark": BookmarkPage,
};

export default routes;
