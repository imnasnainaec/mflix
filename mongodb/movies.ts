import { ObjectId } from "mongodb";

import clientPromise from ".";
import Movie, { movieForMongodb } from "../types/Movie";

export const collectionName = "movies";

export async function getMovies(num = 20): Promise<Movie[]> {
  const collection = (await clientPromise).db().collection(collectionName);
  const movies = await collection
    .find({})
    .sort({ metacritic: -1 })
    .limit(num)
    .toArray();
  return JSON.parse(JSON.stringify(movies));
}

export async function getMovie(id: string): Promise<Movie> {
  const collection = (await clientPromise).db().collection(collectionName);
  const movie = await collection.findOne({ _id: id });
  return JSON.parse(JSON.stringify(movie));
}

export async function addMovie(movie: Movie): Promise<string> {
  const collection = (await clientPromise).db().collection(collectionName);
  const newMovie = movieForMongodb(movie);
  delete newMovie._id;
  const res = await collection.insertOne(newMovie);
  return res.insertedId.toString();
}

export async function deleteMovie(id: string): Promise<boolean> {
  const collection = (await clientPromise).db().collection(collectionName);
  const res = await collection.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount == 1;
}

export async function updateMovie(movie: Movie): Promise<number> {
  if (!movie._id) {
    console.error("Can't update movie without id. Add as new movie instead.");
    return 0;
  }
  const collection = (await clientPromise).db().collection(collectionName);
  const updateObj = movieForMongodb(movie);
  const filter = { _id: new ObjectId(movie._id) };
  const res = await collection.replaceOne(filter, updateObj);
  return res.modifiedCount;
}
