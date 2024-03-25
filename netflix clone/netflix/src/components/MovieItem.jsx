import React from "react";

export const MovieItem = ({ movie }) => {
  return (
    <div>
      <p>{`${movie.title} | ${movie.id}`}</p>
    </div>
  );
};

export default MovieItem;
