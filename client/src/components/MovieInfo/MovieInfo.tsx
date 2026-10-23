import { MINS } from "../../constants/constantVariables";
import type { MovieInfoType } from "./movieInfo.types";
import Genre from "../MovieGenre/MovieGenre";

const MovieInfo = ({
  title,
  releaseYear,
  director,
  duration,
  genre,
}: MovieInfoType) => {
  return (
    <div className="flex min-w-0 flex-col gap-2 sm:gap-4">
      <p className="break-words text-base font-medium sm:text-xl lg:text-2xl">{title}</p>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:gap-x-3 sm:text-base lg:text-lg">
        <p>{releaseYear}</p>
        <p>{director}</p>
        <div className="flex">
          {duration}
          {MINS}
        </div>
      </div>
      <Genre genre={genre} />
    </div>
  );
};

export default MovieInfo;
