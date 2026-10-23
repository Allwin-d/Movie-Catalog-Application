import { Initials, capitalize } from "../../utils/helperFunction";
import { CiUser } from "react-icons/ci";
import { CAST } from "../../constants/constantVariables";

export type castTypes = {
  cast: string[];
};

const Cast = ({ cast }: castTypes) => {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 lg:p-12">
      <h1 className="text-2xl font-bold sm:text-3xl">{capitalize(CAST)}</h1>
      <div className="flex flex-wrap items-center justify-start gap-3">
        {cast.map((person, id) => (
          <div
            key={id}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 px-3 py-2 sm:px-5"
          >
            <p
              className={`rounded-full p-3 text-base font-bold text-white sm:text-lg ${
                id === 1
                  ? "bg-red-500"
                  : id === 2
                    ? "bg-blue-500"
                    : id === 3
                      ? "bg-green-500"
                      : id === 4
                        ? "bg-orange-500"
                        : id === 5
                          ? "bg-pink-600"
                          : "bg-purple-600"
              }`}
            >
              {Initials(person)}
            </p>
            <CiUser className="text-3xl sm:text-4xl" />
            <p className="text-sm font-medium sm:text-base">{person}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
