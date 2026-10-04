export interface Film {
    id: string;
    title: string;
    original_title: string;
    original_title_romanised: string;
    image: string;
    movie_banner: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
    rt_score: string; 
}

const API_URL = "https://ghibliapi.vercel.app/films"

let cache: Promise<Film[]> | undefined

export function getFilms(): Promise<Film[]> {
    cache ??= fetch(API_URL).then((res) => {
        if (!res.ok) throw Error (`Ghibli API error: ${res.status}`)
        return res.json() as Promise<Film[]>
    })
    return cache
}

export function slugify(title: string): string {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}