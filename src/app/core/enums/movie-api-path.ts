export enum MovieApiPath {
  GET_TOP_RATED = 'movie/top_rated?api_key={apiKey}&language={language}&page={page}',
  GET_DISCOVER_MOVIE = 'discover/movie?api_key={apiKey}&language={language}&sort_by=popularity.desc&include_video=false&page={page}&with_watch_monetization_types=flatrate&certification={certification}&certification_country={certificationCountry}&include_adult={includeAdult}&ott_region=ES&vote_count.gte300&vote_average.lte=10',
  GET_CERTIFICATIONS = 'certification/movie/list?api_key={apiKey}'
}
