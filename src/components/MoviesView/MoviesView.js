import Loading from '../../reusables/Loading';
import useFetch from '../../hooks/useFetch';
import PropTypes from 'prop-types';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import MovieSearchBar from './MovieSearchBar/SearchBar';

import { useState, useEffect, useRef } from 'react';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { generateRequestUrlObject, debounce, hasScrolledToBottom } from '../../utils/helpers';
import { MoviesSearchContainer, MovieDisplayContainer, ResultInfo } from './MoviesViewStyles';

function SearchResults({ searchResultString, resultsShown, totalResults }) {
  return (
    <ResultInfo>
      {searchResultString}
      <span>{` ( ${resultsShown} out of ${totalResults} ) `}</span>
    </ResultInfo>
  );
}

export default function MoviesSearch() {
  const sectionRef = useRef();
  const totalResultsRef = useRef(0);
  const remainingDataToLoad = useRef(0);

  const [pages, setPages] = useState(1);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useState([]);

  const isInInitialState = searchParams.length === 0;
  const { href: reqUrl } = generateRequestUrlObject([...searchParams, ['page', pages]]);

  const { data: newlyFetchedMovies, isLoading, error } = useFetch(
    { url: reqUrl },
    isInInitialState
  );

  useEffect(() => {
    pages > 1 && setPages(1);
    setMovies([]);
    remainingDataToLoad.current = 0;
  }, [JSON.stringify(searchParams)]);

  useEffect(() => {
    if (!newlyFetchedMovies || error) return;

    const { Search: newMovies, totalResults } = newlyFetchedMovies;
    totalResultsRef.current = +totalResults;

    setMovies(currentMovieList => {
      const newMovieList = [...currentMovieList, ...newMovies];
      const movieIds = newMovieList.map(({ imbdID }) => imbdID);
      const uniqueMovieList = new Set(movieIds);

      const movieList = newMovieList.filter(({ imbdID }) => uniqueMovieList.has(imbdID));
      remainingDataToLoad.current = +totalResults - movieList.length;

      return movieList;
    });
  }, [JSON.stringify(newlyFetchedMovies)]);

  useEffect(() => {
    if (isInInitialState) return;

    const debouncedScroll = debounce(() => {
      const hasReachedTheEndOfPage = hasScrolledToBottom(sectionRef.current);

      if (!hasReachedTheEndOfPage) return;
      if (!remainingDataToLoad.current) return;

      setPages(prevPage => prevPage + 1);
    }, 1000);

    document.addEventListener('scroll', debouncedScroll);

    return () => document.removeEventListener('scroll', debouncedScroll);
  }, [JSON.stringify(searchParams)]);

  let searchResultString;
  if (!isInInitialState) {
    searchResultString = `Showing results for "${searchParams[0][1]}"`;
  }

  return (
    <MoviesSearchContainer ref={sectionRef}>
      <MovieSearchBar setSearchQuery={setSearchParams} />

      <AnimateSharedLayout type="crossfade">
        {searchResultString && (
          <SearchResults
            searchResultString={searchResultString}
            resultsShown={movies.length}
            totalResults={totalResultsRef.current}
          />
        )}

        <MovieDisplayContainer layoutId="movie-display">
          {movies.map(({ Poster, Title, imdbID, Year }) => (
            <MovieDisplay poster={Poster} title={Title} year={parseInt(Year)} key={imdbID} />
          ))}
        </MovieDisplayContainer>

        <AnimatePresence>
          {isLoading && <Loading layoutId="movie-display" key="loader" fullscreen={true} />}
        </AnimatePresence>
      </AnimateSharedLayout>
    </MoviesSearchContainer>
  );
}

SearchResults.propTypes = {
  searchResultString: PropTypes.string.isRequired,
  totalResults: PropTypes.number.isRequired,
  resultsShown: PropTypes.number.isRequired,
};
