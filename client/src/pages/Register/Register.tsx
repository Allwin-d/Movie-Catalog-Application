import { useState } from "react";
import {
  ADMIN,
  ALREADY_HAVE_AN_ACCOUNT,
  APP_ABOUT,
  APP_DESCRIPTION,
  APP_TITLE,
  COMMENT_ON_MOVIES,
  CREATE_ACCOUNT,
  EMAIL_ADDRESS,
  FIND_MOVIES,
  FULL_NAME,
  JOIN_THE_DISCUSSION,
  KEEP_TRACK_ON,
  MOVIE_STARTS_HERE,
  PASSWORD,
  RATE_AND_REVIEW,
  REGISTER_SUCCESS,
  ROLE,
  SEARCH_AND_FILTER,
  SELECT_ROLE,
  SIGN_IN,
  USER,
} from "../../constants/constantVariables";
import { FaFilm } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { capitalize } from "../../utils/helperFunction";
import type { responseDataType, userDetailType } from "./register.types";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { POST_REGISTER_USER } from "../../url/url";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userDetail, setUserDetail] = useState<userDetailType>({
    userName: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const API_REGISTER_USER = POST_REGISTER_USER;

  const registerUser = async (userData: userDetailType) => {
    const response = await axios.post<responseDataType>(
      API_REGISTER_USER,
      userData,
    );
    console.log("Response : ", response);
    return response.data;
  };

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.message ?? REGISTER_SUCCESS);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userDetail.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    registerUserMutation.mutate(userDetail);
  };

  console.log("user Detail :", userDetail);
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
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold sm:text-3xl">{CREATE_ACCOUNT}</h1>
                <p className="text-2xl sm:text-3xl">🎬</p>
              </div>

              <p className="text-base font-bold leading-7 text-gray-600 sm:text-xl sm:leading-8">
                {APP_DESCRIPTION}
              </p>
              {/* User Details section */}
              <form
                className="flex w-full flex-col gap-6 sm:gap-8"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-bold tracking-wider text-gray-800 sm:text-xl">
                    {capitalize(FULL_NAME)}
                  </p>
                  <div className="relative flex">
                    <CiUser
                      className="absolute top-6 left-3 text-white "
                      strokeWidth={3}
                    />
                    <input
                      name="userName"
                      type="text"
                      placeholder="eg:Tim Cook"
                      value={userDetail.userName}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-gray-800 p-4 pl-10 font-bold tracking-widest text-white sm:p-5 sm:pl-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-bold tracking-wider text-gray-800 sm:text-xl">
                    {capitalize(EMAIL_ADDRESS)}
                  </p>
                  <div className="relative">
                    <MdOutlineEmail
                      className="absolute top-6 left-3 text-white"
                      strokeWidth={3}
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="eg:timcook7@gmail.com"
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
                      placeholder="Min 8 characters"
                      value={userDetail.password}
                      onChange={handleChange}
                      className="w-full rounded-lg bg-gray-800 p-4 pl-10 font-bold tracking-widest text-white sm:p-5 sm:pl-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-base font-bold tracking-wider text-gray-800 sm:text-xl">
                    {capitalize(ROLE)}
                  </p>
                  <select
                    name="role"
                    value={userDetail.role}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-800 p-4 font-bold tracking-widest text-white sm:p-5"
                  >
                    <option value="">{SELECT_ROLE}</option>
                    <option value="User">{USER}</option>
                    <option value="Admin">{ADMIN}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-red-500 py-3 font-bold tracking-wider text-white transition duration-150 hover:scale-[0.99] hover:bg-red-700"
                >
                  {CREATE_ACCOUNT}
                </button>
                <p className="text-center text-sm font-bold tracking-wider text-gray-500 sm:text-base">
                  {ALREADY_HAVE_AN_ACCOUNT}
                  <span
                    className="text-orange-600 cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    {SIGN_IN}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right side section  */}
        <div className="hidden min-h-screen w-full bg-gradient-to-b from-purple-900 to-orange-800 xl:flex xl:w-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-12 p-8 2xl:gap-16 2xl:p-12">
            <h1 className="text-center text-4xl font-bold text-white 2xl:text-6xl">
              {MOVIE_STARTS_HERE}
            </h1>
            <p className="text-center text-2xl font-bold leading-loose tracking-wider text-gray-300 2xl:text-4xl">
              {APP_ABOUT}
            </p>
            <div className="flex w-full max-w-[400px] flex-row gap-6">
              <div className="relative">
                <div className="absolute top-4 -left-20 p-2 bg-gray-300/30 rounded-lg ">
                  <FaSearch className="text-white text-5xl" />
                </div>

                <div className="flex flex-col space-y-4">
                  <p className="text-2xl font-bold text-white 2xl:text-4xl">
                    {SEARCH_AND_FILTER}
                  </p>
                  <p className="text-base font-bold text-gray-300 2xl:text-xl">
                    {FIND_MOVIES}
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
                    {JOIN_THE_DISCUSSION}
                  </p>
                  <p className="text-base font-bold text-gray-300 2xl:text-xl">
                    {COMMENT_ON_MOVIES}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full max-w-[400px] flex-row gap-6">
              <div className="relative">
                <div className="absolute top-4 -left-20 p-2 bg-gray-300/30 rounded-lg">
                  <FaRegStar className="text-white text-5xl" />
                </div>

                <div className="flex flex-col space-y-4">
                  <p className="text-2xl font-bold text-white 2xl:text-4xl">
                    {RATE_AND_REVIEW}
                  </p>
                  <p className="text-base font-bold text-gray-300 2xl:text-xl">
                    {KEEP_TRACK_ON}
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

export default Register;
