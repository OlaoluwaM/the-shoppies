import toast from 'react-hot-toast';
import MovieDisplay from '../MovieDisplay/MovieDisplay';

import { useState } from 'react';
import { getNominationList, removeFromNomineeList } from '../../utils/helpers';
import { m as motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import {
  NominationDisplayContainer,
  RemoveNominationButtonComponent,
} from './NominationViewStyles';

function convertMapToArray(map) {
  return Array.from(map);
}

function RemoveNominationButton({ setNomination, movieData }) {
  const removeNominee = () => {
    const { imdbID, title } = movieData;

    setNomination(currNominations => {
      currNominations.delete(imdbID);
      removeFromNomineeList(imdbID);

      toast.success(`${title} has been removed from nominee list`);
      return new Map(currNominations);
    });
  };

  return (
    <RemoveNominationButtonComponent layout onClick={removeNominee}>
      Remove Nomination
    </RemoveNominationButtonComponent>
  );
}

export default function Nominations() {
  const [nominationMap, setNominations] = useState(getNominationList());

  const nominations = convertMapToArray(nominationMap);
  const noNominations = nominations.length === 0;

  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatePresence>
        {noNominations && (
          <motion.h3 layoutId="nominations">No nominations have been made yet</motion.h3>
        )}
      </AnimatePresence>

      <NominationDisplayContainer layoutId="nominations">
        {nominations.map(([imdbID, { poster, title, year }]) => (
          <MovieDisplay poster={poster} title={title} year={year} key={imdbID} imdbID={imdbID}>
            <RemoveNominationButton setNomination={setNominations} />
          </MovieDisplay>
        ))}
      </NominationDisplayContainer>
    </AnimateSharedLayout>
  );
}
