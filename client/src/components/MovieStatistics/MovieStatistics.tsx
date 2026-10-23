import { IoStar } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import { FaCut } from "react-icons/fa";
import {
  RELEASE_YEAR,
  RATING,
  DURATIION,
} from "../../constants/constantVariables";
import type { MovieStatisticsTypes } from "./movieStatistics.types";

const MovieStatistics = ({
  rating,
  duration,
  releaseYear,
}: MovieStatisticsTypes) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 sm:gap-4 sm:p-6 lg:gap-8 lg:p-12">
      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-yellow-200 px-4 py-5 sm:px-6 lg:py-6">
        <IoStar className="text-yellow-600 text-4xl " />
        <p className="text-2xl font-bold text-yellow-700 sm:text-3xl">{rating}</p>
        <p className="text-lg font-semibold text-yellow-700 sm:text-xl">{RATING}</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-blue-200 px-4 py-5 sm:px-6 lg:py-6">
        <MdTimer className="text-blue-600 text-4xl" />
        <p className="text-2xl font-bold text-blue-700 sm:text-3xl">{duration}</p>
        <p className="text-lg font-semibold text-blue-700 sm:text-xl">{DURATIION}</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-green-200 px-4 py-5 sm:px-6 lg:py-6">
        <FaCut className="text-green-700 text-4xl" />
        <p className="text-2xl font-bold text-green-700 sm:text-3xl">{releaseYear}</p>
        <p className="text-lg font-semibold text-green-700 sm:text-xl">{RELEASE_YEAR}</p>
      </div>
    </div>
  );
};

export default MovieStatistics;
