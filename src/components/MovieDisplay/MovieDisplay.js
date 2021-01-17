import PropTypes from 'prop-types';

import { default as NoImage } from '../../reusables/NoImage';
import { MovieDisplayContainer, MovieInfoWrapper } from './MovieDisplayStyles';
import { m as motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

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
export default function MovieDisplay({ poster, title, year }) {
  const imageSrc = poster.search('N/A') > -1 ? false : poster;

  return (
    <MovieDisplayContainer layout whileHover="hover">
      <MoviePoster imageSrc={imageSrc} movieTitle={title} />

      <MovieInfoWrapper layout="position">
        <h4>{title}</h4>
        <p>{year}</p>
      </MovieInfoWrapper>
    </MovieDisplayContainer>
  );
}

MovieDisplay.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

MoviePoster.propTypes = {
  imageSrc: PropTypes.string,
  movieTitle: PropTypes.string.isRequired,
};
