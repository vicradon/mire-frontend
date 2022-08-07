import Cookies from "js-cookie";

const authenticatedRoute = (Component = null, options = {}) => {
  const token = Cookies.get("userToken");

  if (token) {
    return <Component {...options} />;
  }
  // return <Redirect to="/login" />;
};

export default authenticatedRoute;
