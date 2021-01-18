import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { NOMINEE_LIMIT } from '../../../constants';
import { NominationButton } from './NominationButtonStyles';
import { updateNominationList, getNominationList, checkNominations } from '../../../utils/helpers';

export default function NominationButtonComponent({ movieData }) {
  const { imdbID, title } = movieData;
  const [addedToNominations, setAddedToNominations] = useState(checkNominations(imdbID));

  const addToNomination = () => {
    if (addedToNominations) {
      toast('Movie has already been nominated');
      return;
    }

    if (getNominationList().size === NOMINEE_LIMIT) {
      toast.error('Sorry, you cannot make more than five nominations');
      return;
    }

    toast.success(`Added ${title} to nomination list`);

    updateNominationList(imdbID, movieData);
    setAddedToNominations(true);
  };

  return (
    <NominationButton disabled={addedToNominations} onClick={addToNomination}>
      Nominate
    </NominationButton>
  );
}

NominationButtonComponent.propTypes = {
  movieData: PropTypes.exact({
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    imdbID: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  }),
};
