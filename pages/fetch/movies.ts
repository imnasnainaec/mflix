import Movie from "../../types/Movie";

// These frontend functions have their backend counterparts in pages/api/movies/

export async function addMovie(movie: Movie) {
  const response = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  return await response.json();
}

export async function deleteMovie(id: string) {
  const response = await fetch(`/api/movies/${id}/`, { method: "DELETE" });
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  return await response.json();
}

export async function updateMovie(movie: Movie) {
  const response = await fetch(`/api/movies/${movie._id}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }
  return await response.json();
}
