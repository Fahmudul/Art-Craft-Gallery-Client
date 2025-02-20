import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../../src/Utility.css";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import "../../Utility.css";
const Signin = () => {
  const { logIn } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleSignIn = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log(email, password);
    logIn(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in Successfully");
        setTimeout(function () {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => {
        const errorMessages = error.message;
        const errorCode = errorMessages.split("(")[1].split(")")[0];
        const errorCodeWithoutAuth = errorCode.replace(/^auth\//, "");
        const formattedErrorCode = errorCodeWithoutAuth.replace(/-/g, " ");
        toast.error(formattedErrorCode);
      });
  };
  const handleShowPassword = () => {
    setShow(!show);
    console.log(show);
  };

  return (
    <div className="hero min-h-screen ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>PaletteParadise | Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="card shrink-0 w-full max-w-sm  bg-blur bg-[#979696]">
        <h1 className="text-[#cccccc] text-center text-xl font-bold mt-4">
          Welcome Back!
        </h1>
        <form className="card-body " onSubmit={handleSignIn}>
          <div className="form-control relative">
            <MdEmail className="w-5 h-5 absolute  top-[9px]" />
            <label className="label">
              <span className="label-text text-base font-bold ml-5">Email</span>
            </label>

            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <FaLock className="w-5 h-5 absolute  top-2 " />

            <label className="label ml-5">
              <span className="label-text text-base font-bold">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <span onClick={handleShowPassword}>
              {show ? (
                <FaEyeSlash className="absolute right-[17px] w-6 h-6 top-[52px]" />
              ) : (
                <FaEye className="absolute right-[17px] w-6 h-6 top-[52px]" />
              )}
            </span>
          </div>
          <div className="form-control mt-3">
            <button className="btn bg-gray-800 outline-none border-none text-white">
              Login
            </button>
          </div>

          <p className="mt-7 text-center text-white ">
            Dont Have an account?{" "}
            <Link className="underline  text-blue-800" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
