import { Movie } from './movie';

export interface MovieApiRequest {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
