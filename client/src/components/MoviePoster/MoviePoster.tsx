import { useNavigate } from "react-router-dom";
import type { MoviePosterType } from "./moviePoster.types";

const MoviePoster = ({ id, image, title }: MoviePosterType) => {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/movieDetail/${id}`);
  };

  return (
    <div>
      <img
        src={image}
        alt={title}
        className="h-36 w-24 shrink-0 cursor-pointer rounded-lg object-cover shadow-md shadow-gray-400 transition duration-150 hover:scale-105 sm:h-48 sm:w-32 lg:h-56 lg:w-40"
        onClick={() => handleNavigate(id)}
      />
    </div>
  );
};

export default MoviePoster;
