import { put, call, takeLatest } from 'redux-saga/effects';
import {
  GET_USER_START, GET_USER_ERROR, GET_USER_COMPLETE,
  GET_USERS_COMPLETE, GET_USERS_ERROR,
  CREATE_USER_COMPLETE, CREATE_USER_ERROR,
  GET_USERS_START, CREATE_USER_START,
  UPDATE_USER_START, DELETE_USER_START,
  UPDATE_USER_COMPLETE, DELETE_USER_COMPLETE,
  UPDATE_USER_ERROR, DELETE_USER_ERROR,
} from '../../consts/actionTypes';
import { openSnackbar } from '../../component/FeedbackBar';

import apiCall from '../api';

const createUserErrorMessage = (error) => {
  switch (error.response.data[0]) {
    case "should have required property 'name'":
      return 'Por favor complete el nombre del nuevo usuario';
    case "should have required property 'lastName'":
      return 'Por favor complete el apellido del nuevo usuario';
    case "should have required property 'email'":
      return 'Por favor complete el email del nuevo usuario';
    case "should have required property 'role'":
      return 'Por favor seleccione el rol del nuevo usuario';
    case 'Ya existe el email':
      return 'Ya existe un usuario con ese email';
    default:
      return 'Hubo un problema. Intente crear un usuario más tarde';
  }
};

export function* getUser({ payload }) {
  try {
    const results = yield call(apiCall, '/user/session', payload.bodyUser, null, 'POST');
    yield put({ type: GET_USER_COMPLETE, results });
    yield payload.history.push(localStorage.location);
  } catch (error) {
    const errors = error.response.data;
    yield put({ type: GET_USER_ERROR, errors });
  }
}

export function* getUsers() {
  try {
    const results = yield call(apiCall, '/users', null, null, 'GET');
    yield put({ type: GET_USERS_COMPLETE, results });
  } catch (error) {
    yield put({ type: GET_USERS_ERROR, error });
  }
}

export function* createUser({ payload }) {
  try {
    const results = yield call(apiCall, '/new/user', payload, null, 'POST');
    yield put({ type: CREATE_USER_COMPLETE, results });
    openSnackbar('El usuario ha sido creado exitosamente', 'success');
    yield put({ type: GET_USERS_START, results });
  } catch (error) {
    yield put({ type: CREATE_USER_ERROR, error });
    openSnackbar(createUserErrorMessage(error), 'error');
  }
}

export function* updateUser({ payload }) {
  try {
    const results = yield call(apiCall, '/update/user', payload, null, 'POST');
    yield put({ type: UPDATE_USER_COMPLETE, results });
    openSnackbar('El usuario ha sido actualizado', 'success');
    yield put({ type: GET_USERS_START, results });
  } catch (error) {
    yield put({ type: UPDATE_USER_ERROR, error });
    openSnackbar('Se ha podido al actualizar al usuario', 'error');
  }
}

export function* deleteUser({ payload }) {
  try {
    const results = yield call(apiCall, `/delete/user/${payload.id}`, null, null, 'DELETE');
    yield put({ type: DELETE_USER_COMPLETE, results });
    openSnackbar('El usuario ha sido eliminado', 'success');
    yield put({ type: GET_USERS_START, results });
  } catch (error) {
    yield put({ type: DELETE_USER_ERROR, error });
    openSnackbar('Se ha podido al eliminar al usuario', 'error');
  }
}

export default function* user() {
  yield takeLatest(GET_USER_START, getUser);
  yield takeLatest(GET_USERS_START, getUsers);
  yield takeLatest(CREATE_USER_START, createUser);
  yield takeLatest(UPDATE_USER_START, updateUser);
  yield takeLatest(DELETE_USER_START, deleteUser);
}
