import type { MovieTileType } from "./movieTile.types";
import MoviePoster from "../MoviePoster/MoviePoster";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieActions from "../MovieActions/MovieActions";

const MovieTile = ({
  id,
  image,
  title,
  releaseYear,
  director,
  duration,
  genre,
  rating,
  onDeleteClick
}: MovieTileType) => {
  return (
    <div className="flex flex-row items-center justify-between gap-3 rounded-xl bg-white p-3 shadow-md transition-all duration-150 hover:shadow-xl sm:gap-5 sm:p-5">
      {/* Left side section */}
      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-6 lg:gap-10">
        <MoviePoster image={image} title={title} id ={id} />
        <MovieInfo
          title={title}
          releaseYear={releaseYear}
          director={director}
          duration={duration}
          genre={genre}
        />
      </div>

      {/* This is for the Right Side Section */}
      <MovieActions rating={rating} id={id} onDeleteClick ={onDeleteClick} />
    </div>
  );
};

export default MovieTile;
