import axios from "axios";
import React, { useEffect, useState } from "react";
import endpoints, { createImageUrl } from "../services/movieServices";
import ReactPlayer from "react-player/youtube";
import { Modal } from "./Modal";

export const Hero = () => {
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState({});
  const [play, setPlay] = useState(false);

  useEffect(() => {
    axios.get(endpoints.popular).then((Response) => {
      const movies = Response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      setMovie(randomMovie);
    });
  }, []);

  useEffect(() => {
    async function fetchData(movie) {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          import.meta.env.VITE_TMDB_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message));
      const trailer = data.videos?.results?.find(
        (vid) => vid.type === "Trailer"
      );
      setTrailer(trailer);
    }

    if ("id" in movie) {
      fetchData(movie);
    }
  }, [movie]);

  const truncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  if (!movie)
    return (
      <>
        <p>fetching movie</p>
      </>
    );

  const { title, backdrop_path, release_date, overview } = movie;
  return (
    <div className="h-[550px] lg:h-[850px] w-full  ">
      <Modal />
      {play && trailer?.key && (
        <div className="absolute flex justify-center items-center h-[800px] lg:h-[850px] w-full  z-50">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
            playing
          />
        </div>
      )}
      <div className="w-full h-full">
        <div className="absolute w-full  h-[550px] lg:h-[850px] bg-gradient-to-r from-black" />
        <img
          className="w-full h-full object-cover object-top"
          src={createImageUrl(backdrop_path, "original")}
          alt={title}
        />
        <div className="absolute w-full top-[10%] lg:top-[25%] p-4 md:p-8">
          <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
          <div className="mt-8 mb-4">
            <button
              className="capitalize border  bg-gray-300  text-black py-2 px-5"
              onClick={() => setPlay(true)}
            >
              play
            </button>
            <button className="capitalize border border-gray-300 py-2 px-5 ml-4">
              watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm">{release_date}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35] text-gray-200">
            {truncate(overview, 165)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
