import Header from "../../components/Header/Header";
import AppTitle from "../../components/AppTitle/AppTitle";
import { FaExclamationCircle } from "react-icons/fa";
import { BsFillPinFill } from "react-icons/bs";
import { RiStarLine } from "react-icons/ri";
import { ImParagraphLeft } from "react-icons/im";
import { FaRegImage } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import {
  BASIC_INFO_DESC,
  BASIC_INFORMATION,
  CAST_MEMBERS,
  DIRECTOR,
  DURATIION,
  DURATION_DESC,
  GENRE,
  GENRE_AND_CAST,
  GENRE_CAST_DESC,
  LANGUAGE,
  MOVIE_POSTER,
  MOVIE_POSTER_DESC,
  MOVIE_TITLE,
  POSTER_URL,
  RATING,
  RATING_DESC,
  RELEASE_YEAR,
  SYNOPSIS,
  SYNOPSIS_DESC,
} from "../../constants/constantVariables";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { GET_MOVIE_BY_ID, UPDATE_MOVIE } from "../../url/url";
import { useNavigate, useParams } from "react-router-dom";
import type { EditMovieFormType } from "./updateMovie.types";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [inputs, setInputs] = useState({
    genre: "",
    cast: "",
  });

  // ✅ fetch existing movie to pre-fill the form
  const { data: movie, isLoading } = useQuery<EditMovieFormType>({
    queryKey: ["Movie", id],
    queryFn: async () => {
      const res = await axios.get(`${GET_MOVIE_BY_ID}/${id}`);
      return res.data.data;
    },
  });

  const [editedMovie, setEditedMovie] = useState<EditMovieFormType | null>(
    null,
  );

  const emptyMovie: EditMovieFormType = {
    title: "",
    director: "",
    language: "",
    releaseYear: null,
    genre: [],
    cast: [],
    rating: null,
    duration: null,
    synopsis: "",
    image: "",
  };

  const movieDetails: EditMovieFormType = editedMovie ?? movie ?? emptyMovie;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setEditedMovie((prev) => ({
      ...(prev ?? movie!),
      [name]: value,
    }));
  };

  const handleInputArray = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "genre" | "cast",
  ) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const value = inputs[field].trim();
    if (!value) return;
    setEditedMovie((prev) => ({
      ...(prev ?? movie!),
      [field]: [...(prev ?? movie!)[field], value],
    }));
    setInputs((prev) => ({ ...prev, [field]: "" }));
  };

  const handleRemove = (index: number, field: "genre" | "cast") => {
    const updatedArray = [...movieDetails[field]];
    updatedArray.splice(index, 1);
    setEditedMovie((prev) => {
      const source = prev ?? movie!;

      return {
        ...source,
        [field]: source[field].filter((_, i) => i !== index),
      };
    });
  };

  const updateMovie = async (movieData: EditMovieFormType) => {
    const response = await axios.put(`${UPDATE_MOVIE}/${id}`, movieData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  };

  const updateMovieMutation = useMutation({
    mutationFn: updateMovie,
    onSuccess: () => {
      toast.success("Movie Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["Movies"] });
      queryClient.invalidateQueries({ queryKey: ["Movie", id] });
      navigate(`/movieDetail/${id}`);
    },
    onError: () => {
      toast.error("Failed to Update Movie");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full p-4 text-2xl font-medium text-blue-700 sm:p-8 sm:text-4xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-slate-100">
      <Header />
      <AppTitle
        title="Edit Movie"
        description="Update the details below to edit the movie"
        text={<span className="text-7xl shadow-lg shadow-gray-300">✏️</span>}
      />

      {/* Whole section */}
      <div className="flex min-h-screen flex-col gap-6 bg-white p-4 sm:gap-8 sm:p-6 lg:gap-10 lg:p-10">
        {/* Basic Information section */}
        <div className="flex flex-col space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg shadow-gray-200 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center">
              <FaExclamationCircle className="h-12 w-12 rounded-full bg-red-100 p-2 text-red-500 sm:h-16 sm:w-16" />
            </div>
            <div className="flex flex-col space-y-2 justify-center">
              <h1 className="text-xl font-bold sm:text-2xl">{BASIC_INFORMATION}</h1>
              <p className="text-sm font-bold text-gray-600 sm:text-base">
                {BASIC_INFO_DESC}
              </p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {MOVIE_TITLE} <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name="title"
                value={movieDetails.title}
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                placeholder="eg:Joker"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {DIRECTOR} <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name="director"
                value={movieDetails.director}
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                placeholder="eg:Todd Philips"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {LANGUAGE} <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name="language"
                value={movieDetails.language}
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                placeholder="eg:English"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {RELEASE_YEAR} <span className="text-red-600">*</span>
              </p>
              <input
                type="number"
                name="releaseYear"
                value={movieDetails.releaseYear ?? ""}
                placeholder="eg:2019"
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Genre & Cast Section */}
        <div className="flex flex-col space-y-4 rounded-lg bg-gray-100 p-4 pb-8 shadow-lg shadow-gray-200 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <BsFillPinFill className="h-12 w-12 rounded-full bg-blue-100 p-2 text-blue-500 sm:h-16 sm:w-16" />
            </div>
            <div className="flex flex-col space-y-2 justify-center">
              <h1 className="text-xl font-bold sm:text-2xl">{GENRE_AND_CAST}</h1>
              <p className="text-sm font-bold text-gray-600 sm:text-base">
                {GENRE_CAST_DESC}
              </p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {GENRE} <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name="genre"
                value={inputs.genre}
                placeholder="Type a genre and press Enter(eg: Action)"
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, genre: e.target.value }))
                }
                onKeyDown={(e) => handleInputArray(e, "genre")}
              />
              <div className="flex flex-wrap gap-2">
                {movieDetails.genre.map((genre, id) => (
                  <div
                    key={id}
                    className="flex flex-row items-center justify-center space-x-2 bg-purple-200 p-2 rounded-full"
                  >
                    <p className="font-bold text-purple-700">{genre}</p>
                    <ImCancelCircle
                      className="h-8 w-6 hover:cursor-pointer"
                      onClick={() => handleRemove(id, "genre")}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {CAST_MEMBERS} <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name="cast"
                value={inputs.cast}
                placeholder="Type a name and press Enter(eg:Joaquin Phoenix)"
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                onKeyDown={(e) => handleInputArray(e, "cast")}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, cast: e.target.value }))
                }
              />
              <div className="flex flex-wrap gap-2">
                {movieDetails.cast.map((cast, id) => (
                  <div
                    key={id}
                    className="flex flex-row items-center justify-center space-x-2 bg-blue-200 p-2 rounded-full"
                  >
                    <p className="font-bold text-blue-700">{cast}</p>
                    <ImCancelCircle
                      className="h-8 w-6 hover:cursor-pointer"
                      onClick={() => handleRemove(id, "cast")}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rating & Duration */}
        <div className="flex flex-col space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg shadow-gray-200 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <RiStarLine className="h-12 w-12 rounded-full bg-green-100 p-2 text-green-500 sm:h-16 sm:w-16" />
            </div>
            <div className="flex flex-col space-y-2 justify-center">
              <h1 className="text-xl font-bold sm:text-2xl">{RATING}</h1>
              <p className="text-sm font-bold text-gray-600 sm:text-base">{RATING_DESC}</p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {RATING} <span className="text-red-600">*</span>
              </p>
              <input
                type="number"
                name="rating"
                value={movieDetails.rating ?? ""}
                placeholder="eg:8.4"
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                onChange={handleChange}
              />
              <p className="text-sm text-gray-600 sm:text-base">{RATING_DESC}</p>
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {DURATIION} <span className="text-red-600">*</span>
              </p>
              <input
                type="number"
                name="duration"
                value={movieDetails.duration ?? ""}
                placeholder="eg:122"
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                onChange={handleChange}
              />
              <p className="text-sm text-gray-600 sm:text-base">{DURATION_DESC}</p>
            </div>
          </div>
        </div>

        {/* Synopsis */}
        <div className="flex flex-col space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg shadow-gray-200 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <ImParagraphLeft className="h-12 w-12 rounded-full bg-yellow-100 p-2 text-yellow-500 sm:h-16 sm:w-16" />
            </div>
            <div className="flex flex-col space-y-2 justify-center">
              <h1 className="text-xl font-bold sm:text-2xl">{SYNOPSIS}</h1>
              <p className="text-sm font-bold text-gray-600 sm:text-base">{SYNOPSIS_DESC}</p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {SYNOPSIS}
              </p>
              <textarea
                rows={5}
                name="synopsis"
                value={movieDetails.synopsis}
                placeholder="Write a short description of the movie plot"
                onChange={handleChange}
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
              />
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="flex flex-col space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg shadow-gray-200 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <FaRegImage className="h-12 w-12 rounded-full bg-purple-100 p-2 text-purple-500 sm:h-16 sm:w-16" />
            </div>
            <div className="flex flex-col space-y-2 justify-center">
              <h1 className="text-xl font-bold sm:text-2xl">{MOVIE_POSTER}</h1>
              <p className="text-sm font-bold text-gray-600 sm:text-base">
                {MOVIE_POSTER_DESC}
              </p>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col space-y-4">
              <p className="text-base font-bold tracking-wider text-gray-600 sm:text-lg">
                {POSTER_URL} <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                name="image"
                value={movieDetails.image}
                placeholder="https://image.tmdb.org/"
                className="w-full rounded-lg bg-gray-800 p-4 pl-5 font-semibold tracking-wide text-white sm:p-5 sm:pl-10 sm:tracking-widest"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className="flex justify-stretch sm:justify-end">
          <button
            className="w-full rounded-lg bg-purple-600 px-6 py-3 text-lg text-white transition duration-150 hover:scale-[0.99] hover:bg-purple-800 disabled:opacity-50 sm:w-auto sm:text-xl"
            onClick={() => updateMovieMutation.mutate(movieDetails!)}
            disabled={updateMovieMutation.isPending}
          >
            {updateMovieMutation.isPending ? "Updating..." : "Update Movie"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
