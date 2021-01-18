import PropTypes from 'prop-types';

import { default as NoImage } from '../../reusables/NoImage';
import { default as NominationButton } from './NominationButton/NominationButton';
import { isValidElement, cloneElement } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { MovieDisplayContainer, MovieInfoWrapper } from './MovieDisplayStyles';

function MoviePoster({ imageSrc, movieTitle }) {
  return (
    <AnimatePresence>
      {imageSrc ? (
        <motion.img
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          src={imageSrc}
          alt={movieTitle}
          layout
          key="image"
          title={movieTitle}
        />
      ) : (
        <NoImage
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="default-poster"
          layout
          key="poster"
          title="Poster not available"
        />
      )}
    </AnimatePresence>
  );
}
export default function MovieDisplay({ poster, title, year, imdbID, children }) {
  const imageSrc = poster.search('N/A') > -1 ? false : poster;

  const movieData = { title, poster, year, imdbID };

  return (
    <MovieDisplayContainer layout>
      <MoviePoster imageSrc={imageSrc} movieTitle={title} />

      <MovieInfoWrapper layout="position">
        <h4>{title}</h4>
        <p>{year}</p>
      </MovieInfoWrapper>

      {isValidElement(children) ? (
        cloneElement(children, { movieData })
      ) : (
        <NominationButton movieData={movieData} />
      )}
    </MovieDisplayContainer>
  );
}

MovieDisplay.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  imdbID: PropTypes.string,
  children: PropTypes.element, // I need it somewhere else, so for reusability sake
};

MoviePoster.propTypes = {
  imageSrc: PropTypes.string,
  movieTitle: PropTypes.string.isRequired,
};
