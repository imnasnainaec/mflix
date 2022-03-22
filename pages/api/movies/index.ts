import type { NextApiRequest, NextApiResponse } from "next";

import { addMovie, getMovies } from "../../../mongodb/movies";

// These backend API routes have their frontend counterparts in pages/fetch/movies

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const movies = await getMovies();
      res.json(movies);
      return;
    case "POST":
      res.json(addMovie(req.body));
      return;
  }
}
