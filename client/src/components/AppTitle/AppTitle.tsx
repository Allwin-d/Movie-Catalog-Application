import { FaFilm } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import type { payloadType } from "../../hooks/useAuth.types";
import type { AppTitletype } from "./appTitle.types";
import { useNavigate } from "react-router-dom";

const AppTitle = ({
  title,
  description,
  totalMovies,
  buttonInfo,
  text,
}: AppTitletype) => {
  const token = useAuth() as payloadType;
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col items-start justify-between gap-5 bg-gradient-to-r from-purple-900 to-purple-800 px-4 py-6 font-bold sm:flex-row sm:items-center sm:px-6 sm:py-8 lg:px-12">
      <div className="flex min-w-0 flex-col gap-2 sm:gap-4">
        <div className="flex items-center gap-3 text-3xl sm:text-4xl lg:text-5xl">
          <h1 className="text-white">{title} </h1>
          <FaFilm className="shrink-0 rounded-md bg-orange-600 p-2 text-3xl text-white sm:text-4xl lg:text-5xl" />
        </div>
        <p className="text-sm tracking-wider text-gray-300 sm:text-base">
          {`${totalMovies ? totalMovies : ""} ${description}`}
        </p>
      </div>

      {/* Right side section */}
      <div className="text-base text-white sm:text-xl">
        {token?.role === "Admin" && buttonInfo ? (
          <button
            className="rounded-full bg-blue-500 px-5 py-3 text-sm transition duration-150 hover:scale-95 hover:bg-blue-700 sm:px-6 sm:py-4 sm:text-base"
            onClick={() => navigate("/addMovie")}
          >
            {buttonInfo}
          </button>
        ) : (
          (text ?? <p className="text-3xl text-white">{text}</p>)
        )}
      </div>
    </div>
  );
};

export default AppTitle;
