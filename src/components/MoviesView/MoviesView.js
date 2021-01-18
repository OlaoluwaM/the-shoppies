import Loading from '../../reusables/Loading';
import useFetch from '../../hooks/useFetch';
import ErrorSVG from '../../reusables/Error';
import PropTypes from 'prop-types';
import MovieDisplay from '../MovieDisplay/MovieDisplay';
import MovieSearchBar from './MovieSearchBar/SearchBar';

import { useState, useEffect, useRef } from 'react';
import { generateRequestUrlObject, debounce } from '../../utils/helpers';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import {
  ResultInfo,
  ErrorDisplayWrapper,
  MoviesSearchContainer,
  MovieDisplayContainer,
} from './MoviesViewStyles';

function hasScrolledToBottom(element = document) {
  return window.innerHeight + window.scrollY >= element.offsetHeight - 1500;
}
function SearchResults({ searchResultString, resultsShown, totalResults }) {
  return (
    <ResultInfo>
      {searchResultString}
      <span>{` ( ${resultsShown} out of ${totalResults} ) `}</span>
    </ResultInfo>
  );
}

function ErrorDisplay({ message, layoutId, layout }) {
  return (
    <ErrorDisplayWrapper layoutId={layoutId} layout={layout}>
      <ErrorSVG />
      <h3>{message}</h3>
    </ErrorDisplayWrapper>
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
  if (!isInInitialState && !isLoading && newlyFetchedMovies) {
    searchResultString = `Showing results for "${searchParams[0][1]}"`;
  }
  const hasError = !newlyFetchedMovies && !isLoading && error;

  return (
    <MoviesSearchContainer ref={sectionRef}>
      <MovieSearchBar setSearchQuery={setSearchParams} />

      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {searchResultString && !hasError && (
            <SearchResults
              searchResultString={searchResultString}
              resultsShown={movies.length}
              totalResults={totalResultsRef.current}
            />
          )}
        </AnimatePresence>

        <MovieDisplayContainer layoutId="movie-display">
          {movies.map(({ Poster, Title, imdbID, Year }) => (
            <MovieDisplay
              poster={Poster}
              title={Title}
              year={parseInt(Year)}
              key={imdbID}
              imdbID={imdbID}
            />
          ))}
        </MovieDisplayContainer>

        <AnimatePresence>
          {hasError && (
            <ErrorDisplay message={error.Error} layoutId="movie-display" layout="position" />
          )}

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

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
};
