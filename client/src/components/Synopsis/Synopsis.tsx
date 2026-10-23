import { capitalize } from "../../utils/helperFunction";
import { SYNOPSIS } from "../../constants/constantVariables";
import type { synopsisData } from "./synopsis.types";

const Synopsis = ({ synopsis }: synopsisData) => {
  return (
    <div className="flex w-full flex-col gap-4 p-4 sm:p-6 lg:w-3/4 lg:p-12">
      <h1 className="text-2xl font-bold sm:text-3xl">{capitalize(SYNOPSIS)}</h1>
      <div className="border-2 border-gray-200 p-4 sm:border-4 sm:p-7">
        <p className="break-words text-base font-bold leading-7 tracking-wide text-gray-600 sm:text-lg sm:leading-9">
          {synopsis}
        </p>
      </div>
    </div>
  );
};

export default Synopsis;
