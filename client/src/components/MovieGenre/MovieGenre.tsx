import type { GenreType } from "./MovieGenre.types";

const MovieGenre = ({ genre }: GenreType) => {
  return (
    <div className="flex flex-wrap gap-2 text-sm sm:gap-3 sm:text-base">
      {genre.map((genre: string, id: number) => (
        <p
          key={id}
          className={`${
            id === 1
              ? "bg-red-300 text-red-700 p-2 border-red-900 border-2"
              : id === 2
                ? "bg-blue-300 text-blue-700 p-2 border-blue-900 border-2"
                : "bg-green-300 text-green-700 p-2 border-green-900 border-2"
          } rounded-3xl px-3 font-medium`}
        >
          {genre}
        </p>
      ))}
    </div>
  );
};

export default MovieGenre;
