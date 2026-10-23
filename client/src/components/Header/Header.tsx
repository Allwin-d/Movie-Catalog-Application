import { useNavigate } from "react-router-dom";
import { APP_TITLE } from "../../constants/constantVariables";
import logo from "../../images/icon.png";
import useAuth from "../../hooks/useAuth";
import type { payloadType } from "../../hooks/useAuth.types";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  const token = useAuth() as payloadType;
  console.log("Token Details : ", token);

  return (
    <div className="sticky top-0 z-50 flex min-h-16 w-full items-center justify-between gap-3 bg-gray-300 px-4 py-3 shadow-sm shadow-gray-500 sm:px-6 lg:px-12">
      {/* Left side section */}
      <div
        className="flex min-w-0 items-center gap-2"
        onClick={handleNavigate}
      >
        <img
          src={logo}
          alt="App Logo"
          className="h-10 w-10 shrink-0 cursor-pointer rounded-xl sm:h-12 sm:w-12"
        />
        <p className="truncate text-sm font-medium sm:text-lg">{APP_TITLE}</p>
      </div>

      {/* Right side section  */}
      <div className="flex shrink-0 items-center gap-2 text-sm sm:gap-4 sm:text-base">
        <p className="rounded-full bg-red-600 px-3 py-1.5 font-medium text-white sm:px-4 sm:py-2">
          {token.role}
        </p>
        <p className="max-w-28 truncate font-medium sm:max-w-none">
          Hi {token.userName.split(" ")[0]}{" "}
        </p>
      </div>
    </div>
  );
};

export default Header;
