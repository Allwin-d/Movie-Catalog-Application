import { useQuery } from "@tanstack/react-query";
import { GET_SPECIFIC_MOVIE } from "../../url/url";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { movieDataType } from "../MovieDetail/movieDetail.types";
import {
  FAILED_LOADING_DATA,
  LOADING_DATA,
} from "../../constants/constantVariables";
import MovieGenre from "../../components/MovieGenre/MovieGenre";
import Synopsis from "../../components/Synopsis/Synopsis";
import Cast from "../../components/Cast/Cast";
import MovieStatistics from "../../components/MovieStatistics/MovieStatistics";
import MovieMetaData from "../../components/MovieMetaData/MovieMetaData";
import Image from "../../components/Image/Image";
import Header from "../../components/Header/Header";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import type { payloadType } from "../../hooks/useAuth.types";

const MovieDetail = () => {
  const { id } = useParams();
  const token = useAuth() as payloadType;

  const fetchSingleMovie = async () => {
    const response = await axios.get<movieDataType>(
      `${GET_SPECIFIC_MOVIE}/${id}`,
    );

    return response.data.data; // return only movie object
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["singleMovie", id],
    queryFn: fetchSingleMovie,
    enabled: !!id,
  });

  if (isLoading) {
    return <div>{LOADING_DATA}</div>;
  }

  if (isError) {
    return <div>{FAILED_LOADING_DATA}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center gap-6 bg-gradient-to-r from-purple-900 to-orange-800 p-4 sm:p-6 lg:flex-row lg:items-start lg:gap-10 lg:p-12">
        <Image
          source={data?.image ?? ""}
          alt={data?.title ?? ""}
          width="w-48 sm:w-56 lg:w-72"
          height="h-auto"
          object="object-cover"
          rounded="rounded-lg"
          shadow="shadow-xl shadow-gray-300"
        />

        <div className="flex w-full flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Left Side section */}
          <div className="flex min-w-0 flex-col gap-5 sm:gap-8 lg:gap-10">
            <p className="break-words text-3xl font-bold text-white sm:text-4xl">{data?.title}</p>
            <MovieMetaData
              releaseYear={data?.releaseYear ?? 0}
              language={data?.language ?? ""}
              director={data?.director ?? ""}
              duration={data?.duration ?? 0}
            />
            <MovieGenre genre={data?.genre ?? []} />
            <p className="w-fit rounded-lg border-2 border-yellow-700 bg-yellow-500 px-5 py-3 text-center text-xl font-semibold text-yellow-950 sm:border-4 sm:px-8 sm:py-4 sm:text-2xl">
              {data?.rating} / 10
            </p>
          </div>
          {/* Right Side Section */}
          <div className="flex gap-6 font-bold text-3xl sm:gap-8 sm:text-4xl lg:gap-10">
            <FaEdit
              className={`cursor-pointer text-white transition duration-200 hover:scale-125 ${token.role === "User" ? "hidden" : "visible"}`}
            />
            <FaTrashAlt
              className={`cursor-pointer text-white transition duration-200 hover:scale-125 ${token.role === "User" ? "hidden" : "visible"}`}
            />
          </div>
        </div>
      </div>
      {/* Movie Statistics Section */}
      <MovieStatistics
        rating={data?.rating ?? 0}
        duration={data?.duration ?? 0}
        releaseYear={data?.releaseYear ?? 0}
      />
      {/* Cast Section */}
      <Cast cast={data?.cast ?? []} />
      {/* Synopsis Section */}
      <Synopsis synopsis={data?.synopsis ?? ""} />
    </div>
  );
};

export default MovieDetail;
