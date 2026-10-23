import { useState } from "react";
import {
  ACCESS_THE_FULL_MOVIE,
  APP_TITLE,
  DATA_IS_PROTECTED,
  DONT_HAVE_AN_ACCOUNT,
  EMAIL_ADDRESS,
  INVALID_CRED,
  LOGGED_IN,
  PASSWORD,
  PICK_UP,
  REGISTER,
  SAVED_CATALOG,
  SECURE_LOGIN,
  SEE_AND_MANAGE,
  SIGN_IN,
  SIGN_IN_DESC,
  SING_IN_ABOUT,
  WELCOME_BACK,
  YOUR_COMMENTS,
} from "../../constants/constantVariables";
import { capitalize } from "../../utils/helperFunction";
import { MdMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { HiOutlineSave } from "react-icons/hi";
import { GrSecure } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import type { userDetailType } from "./login.types";
import axios from "axios";
import { POST_LOGIN_USER } from "../../url/url";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { responseDataType } from "./login.types";
import { FaFilm } from "react-icons/fa6";

const Login = () => {
  const [userDetail, setUserDetail] = useState<userDetailType>({
    email: "",
    password: "",
  });

  const API_LOGIN_USER = POST_LOGIN_USER;

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginUser = async (userData: userDetailType) => {
    const response = await axios.post<responseDataType>(
      API_LOGIN_USER,
      userData,
    );
    console.log("Login Response Data : ", response);
    return response.data;
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success(data.message ?? LOGGED_IN);
      localStorage.setItem("Token", data.accessToken);
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message ?? INVALID_CRED);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Button clicked ");
    loginMutation.mutate(userDetail);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col xl:flex-row">
        {/* Left side section */}
        <div className="min-h-screen w-full bg-blue-400 xl:w-1/2">
          <div className="min-h-screen w-full bg-gray-100 p-5 sm:p-8 lg:p-12">
            <div className="mx-auto flex max-w-2xl flex-col gap-6 sm:gap-8">
              <div className="flex items-center gap-3 text-3xl font-bold sm:gap-6 sm:text-5xl">
                <h1>{APP_TITLE}</h1>
                <FaFilm className="shrink-0 rounded-md bg-orange-600 p-2 text-3xl text-white sm:text-5xl" />
              </div>
              <div className="flex space-x-6">
                <h1 className="text-2xl font-bold sm:text-3xl">{WELCOME_BACK}</h1>
              </div>

              <p className="text-base font-bold leading-7 text-gray-600 sm:text-xl sm:leading-8">
                {SIGN_IN_DESC}
              </p>
              {/* User Details section */}
              <form
                className="flex w-full flex-col gap-6 sm:gap-8"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-bold tracking-wider text-gray-800 sm:text-xl">
                    {capitalize(EMAIL_ADDRESS)}
                  </p>
                  <div className="relative flex">
                    <MdMailOutline
                      className="absolute top-6 left-3 text-white "
                      strokeWidth={3}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="eg:Tim Cook"
                      value={userDetail.email}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-gray-800 p-4 pl-10 font-bold tracking-widest text-white sm:p-5 sm:pl-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-bold tracking-wider text-gray-800 sm:text-xl">
                    {capitalize(PASSWORD)}
                  </p>
                  <div className="relative">
                    <TbLockPassword
                      className="absolute top-6 left-3 text-white"
                      strokeWidth={3}
                    />
                    <input
                      name="password"
                      type="password"
                      placeholder="eg:timcook7@gmail.com"
                      value={userDetail.password}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-gray-800 p-4 pl-10 font-bold tracking-widest text-white sm:p-5 sm:pl-10"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-sky-500 py-3 font-bold tracking-wider text-white transition duration-150 hover:scale-[0.99] hover:bg-sky-700"
                >
                  {SIGN_IN}
                </button>
                <p className="text-center text-sm font-bold tracking-wider text-gray-500 sm:text-base">
                  {DONT_HAVE_AN_ACCOUNT}
                  <span
                    className="text-sky-600 cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    {REGISTER}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right side section  */}
        <div className="hidden min-h-screen w-full bg-gradient-to-b from-sky-900 to-sky-700 xl:flex xl:w-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-12 p-8 2xl:gap-16 2xl:p-12">
            <h1 className="text-center text-4xl font-bold leading-normal text-white 2xl:text-6xl">
              {PICK_UP}
            </h1>
            <p className="text-center text-2xl font-bold leading-normal tracking-wider text-gray-300 2xl:text-4xl">
              {SING_IN_ABOUT}
            </p>
            <div className="flex w-full max-w-[400px] flex-row gap-6">
              <div className="relative">
                <div className="absolute top-4 -left-20 p-2 bg-gray-300/30 rounded-lg">
                  <HiOutlineSave className="text-white text-5xl" />
                </div>

                <div className="flex flex-col space-y-4">
                  <p className="text-2xl font-bold text-white 2xl:text-4xl">
                    {SAVED_CATALOG}
                  </p>
                  <p className="text-base font-bold leading-7 text-gray-300 2xl:text-xl">
                    {ACCESS_THE_FULL_MOVIE}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full max-w-[400px] flex-row gap-6">
              <div className="relative">
                <div className="absolute top-4 -left-20 p-2 bg-gray-300/30 rounded-lg">
                  <GrSecure className="text-white text-5xl" />
                </div>

                <div className="flex flex-col space-y-4">
                  <p className="text-2xl font-bold text-white 2xl:text-4xl">
                    {SECURE_LOGIN}
                  </p>
                  <p className="text-base font-bold leading-7 text-gray-300 2xl:text-xl">
                    {DATA_IS_PROTECTED}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full max-w-[400px] flex-row gap-6">
              <div className="relative">
                <div className="absolute top-4 -left-20 p-2 bg-gray-300/30 rounded-lg">
                  <FaRegComment className="text-white text-5xl" />
                </div>

                <div className="flex flex-col space-y-4">
                  <p className="text-2xl font-bold text-white 2xl:text-4xl">
                    {YOUR_COMMENTS}
                  </p>
                  <p className="text-base font-bold leading-7 text-gray-300 2xl:text-xl">
                    {SEE_AND_MANAGE}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
