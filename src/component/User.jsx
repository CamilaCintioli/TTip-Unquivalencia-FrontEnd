/* eslint-disable import/no-duplicates */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { size } from 'lodash';
import columns from './User/colums';
import { registerUser, getUsers } from '../redux/actions/user';
import { usersResults } from '../redux/selectors';
import FeedbackBar from './FeedbackBar';

function User() {
  const users = useSelector((state) => usersResults(state));
  const _size = size(users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, _size]);

  const createUser = useCallback((newData) => {
    dispatch(registerUser(newData));
  }, [dispatch]);

  return (
    <>
      <MaterialTable
        title="Usuarios"
        columns={columns}
        data={users}
        editable={{
          onRowAdd: (newData) => new Promise((resolve) => resolve(createUser(newData))),
          onRowUpdate: (newData, oldData) => new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 600);
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 600);
          }),
        }}
      />
      <FeedbackBar />
    </>
  );
}

export default User;
