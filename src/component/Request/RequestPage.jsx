import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import RequestDisplay from './RequestDisplay';
import { approveEquivalence, rejectEquivalence } from '../../redux/actions/updateEquivalence';

export default function RequestPage({ request }) {
  const dispatch = useDispatch();

  const giveEquivalence = useCallback(() => {
    dispatch(approveEquivalence({ requestId: request.id }));
  }, [dispatch]);
  const denyEquivalence = useCallback(() => {
    dispatch(rejectEquivalence({ requestId: request.id }));
  }, [dispatch]);


  return (
    <RequestDisplay
      request={request}
      onEquivalenceGiven={giveEquivalence}
      onEquivalenceDenied={denyEquivalence}
    />
  );
}

// RequestPage.propTypes = {
//   match: shape({
//     params: shape({
//       solicitudId: string.isRequired,
//     }),
//   }).isRequired,
// };
