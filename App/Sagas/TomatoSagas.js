import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import TomatoActions from '../Redux/TomatoRedux'
import AppConfig from '../Config/AppConfig'
import TomatoApi from '../Services/TomatoApi'

export function * categoriesRequest () {
  const { username } = action
  // make the call to the api
  const response = yield call(TomatoApi.callApi(AppConfig.baseURL+"categories", "GET",""))
  console.log("response :", response)

  if (response.ok) {
    yield put(TomatoActions.categoriesSuccess(response))
  } else {
    yield put(TomatoActions.categoriesFailure(response.error))
  }
}