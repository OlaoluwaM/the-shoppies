import PropTypes from 'prop-types';

import { m as motion } from 'framer-motion';
import { default as NoImage } from '../../reusables/NoImage';
import { MovieDisplayContainer, MovieInfoWrapper } from './MovieDisplayStyles';

export default function MovieDisplay({ poster, title, year }) {
  const imageSrc = poster.search('N/A') > -1 ? false : poster;

  return (
    <MovieDisplayContainer layout whileHover="hover">
      {imageSrc ? (
        <motion.img src={imageSrc} alt={title} layout key="image" />
      ) : (
        <NoImage className="default-poster" layout key="poster" />
      )}

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
