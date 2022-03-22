import { Button } from "@mui/material";
//import Link from "next/link";

import Movie from "../types/Movie";
import { getMovies } from "../mongodb/movies";
import { addMovie, deleteMovie, updateMovie } from "./fetch/movies";
import { useRouter } from "next/router";

interface MoviesProps {
  movies: Movie[];
}

export default function Movies(props: MoviesProps) {
  const router = useRouter();
  function annihilate(id: string) {
    deleteMovie(id).then(() => router.reload());
  }
  function duplicate(movie: Movie) {
    addMovie(movie).then(() => router.reload());
  }
  function elevate(movie: Movie) {
    const metacritic = (movie.metacritic ?? 0) + 1;
    updateMovie({ ...movie, metacritic }).then(() => router.reload());
  }

  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {props.movies.map((movie) => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            {/*<Link href={`movies?delete=${movie._id}`}>
              <Button>Erase from existence</Button>
        </Link>*/}
            <Button onClick={() => annihilate(movie._id!)}>Annihilate</Button>
            <Button onClick={() => duplicate(movie)}>Duplicate</Button>
            <Button onClick={() => elevate(movie)}>Elevate</Button>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot ?? movie.fullplot}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  /*const delId = context.query.delete;
  if (delId) {
    await deleteMovie(delId);
    return { redirect: { permanent: false, destination: "/movies" } };
  }*/
  return { props: { movies: await getMovies() } };
}
