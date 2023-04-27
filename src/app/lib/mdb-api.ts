import {MangaDBAPI} from "mangadb-api";

const api_env: string = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "sandbox";
const API: MangaDBAPI = new MangaDBAPI(api_env);

export {API};