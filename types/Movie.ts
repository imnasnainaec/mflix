import { ObjectId, Timestamp } from "mongodb";

export default class Movie {
  _id?: string; // send to server as mongodb ObjectId(_id)
  genres: string[] = [];
  runtime = 0; // minutes
  rated = "";
  cast: string[] = [];
  num_mflix_comments = 0;
  poster = "";
  title = "";
  plot?: string;
  fullplot?: string;
  languages: string[] = [];
  released?: number; //send to server as Date()
  directors: string[] = [];
  writers: string[] = [];
  awards = new Awards();
  lastupdated = "";
  year = "";
  imdb = new Imdb();
  countries: string[] = [];
  type = "";
  tomatoes = new Tomatoes();
  metacritic?: number;
}

export function movieForMongodb(movie: Movie) {
  const dbObject: any = { ...movie };
  if (movie._id) dbObject._id = new ObjectId(movie._id);
  if (movie.released) dbObject.released = new Date(movie.released);
  if (movie.tomatoes.dvd) dbObject.tomatoes.dvd = new Date(movie.tomatoes.dvd);
  if (movie.tomatoes.updated)
    dbObject.tomatoes.updated = new Date(movie.tomatoes.updated);
  return dbObject;
}

export class Awards {
  wins = 0;
  nominations = 0;
  text = "";
}

export class Imdb {
  rating = 0;
  votes = 0;
  id = 0;
}

export class Tomatoes {
  rotten?: number;
  fresh?: number;
  viewer?: TomatoesRatings;
  critic?: TomatoesRatings;
  production?: string;
  dvd?: number; //send to server as Date()
  updated?: number; //send to server as Date()
}

export class TomatoesRatings {
  rating = 0;
  numReviews = 0;
  meter = 0;
}
