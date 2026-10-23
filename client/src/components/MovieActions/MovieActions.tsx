import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import type { MovieActionsType } from "./movieActions.types";
import useAuth from "../../hooks/useAuth";
import type { payloadType } from "../../hooks/useAuth.types";
import { useNavigate } from "react-router-dom";

const MovieActions = ({ rating, id, onDeleteClick }: MovieActionsType) => {
  const token = useAuth() as payloadType;
  const navigate = useNavigate();

  return (
    <div
      className={`flex shrink-0 items-center gap-3 font-bold text-xl sm:gap-5 sm:text-2xl lg:gap-8 lg:text-3xl ${token.role !== "Admin" ? "mr-1" : ""}`}
    >
      <p className="cursor-pointer">⭐{rating}</p>
      <FaEye
        className={`cursor-pointer transition duration-200 hover:scale-125`}
        onClick={() => navigate(`/movieDetail/${id}`)}
      />
      <FaEdit
        className={`cursor-pointer transition duration-200 hover:scale-125 ${token.role === "User" ? "hidden" : "visible"}`}
        onClick={() => navigate(`/editMovie/${id}`)}
      />
      <FaTrashAlt
        onClick={onDeleteClick}
        className={`cursor-pointer transition duration-200 hover:scale-125 ${token.role === "User" ? "hidden" : "visible"}`}
      />
    </div>
  );
};

export default MovieActions;
