import { MINS } from "../../constants/constantVariables";
import type { movieMetaDataTypes } from "./movieMetaData.types";

const MovieMetaData = ({
  releaseYear,
  language,
  director,
  duration,
}: movieMetaDataTypes) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-base font-medium text-gray-200 sm:gap-x-6 sm:text-lg lg:gap-x-8 lg:text-xl">
      <p className="">{releaseYear}</p>
      <p>{language}</p>
      <p>{director}</p>
      <p>
        {duration}
        {MINS}
      </p>
    </div>
  );
};

export default MovieMetaData;
