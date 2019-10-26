/* eslint-disable no-new */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RequestDisplay from './RequestDisplay';
import { approveEquivalence, rejectEquivalence, sendConsult } from '../../redux/actions/updateEquivalence';
import FeedbackBar from '../FeedbackBar';
import { userRole } from '../../redux/selectors';

export default function RequestPage({ request }) {
  const dispatch = useDispatch();
  const giveEquivalence = useCallback(() => {
    dispatch(approveEquivalence({
      requestId: request.id,
      fileId: request.fk_fileid,
    }));
  }, [dispatch]);

  const denyEquivalence = useCallback(() => {
    dispatch(rejectEquivalence({
      requestId: request.id,
      fileId: request.fk_fileid,
    }));
  }, [dispatch]);

  const consultEquivalenceRequest = useCallback((email, message) => {
    dispatch(sendConsult({
      requestId: request.id,
      email,
      message,
    }));
  }, [dispatch]);

  const user = useSelector((state) => userRole(state));

  return (
    <>
      <RequestDisplay
        request={request}
        onEquivalenceGiven={giveEquivalence}
        onEquivalenceDenied={denyEquivalence}
        onEquivalenceConsulted={consultEquivalenceRequest}
        showConsultButton={user === 'admin'}
      />
      <FeedbackBar />
    </>
  );
}
