import type { NextApiRequest, NextApiResponse } from "next";

import { updateMovie, getMovie, deleteMovie } from "../../../mongodb/movies";
import Movie from "../../../types/Movie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    return;
  }
  switch (req.method) {
    case "GET":
      const movie = await getMovie(id);
      res.json(movie);
      return;
    case "POST":
      const newMovie = req.body as Movie;
      if (id !== newMovie._id) {
        return;
      }
      res.json(updateMovie(req.body));
      return;
    case "DELETE":
      res.json(deleteMovie(id));
      return;
  }
}
