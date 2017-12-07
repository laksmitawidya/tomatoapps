import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import TomatoActions from '../Redux/TomatoRedux'
import AppConfig from '../Config/AppConfig'
import TomatoApi from '../Services/TomatoApi'

const Api = TomatoApi.create()
export function * categoriesRequest () {
  // make the call to the api
  const response = yield call(Api.callApi, AppConfig.baseURL+"categories", "GET","")

  if (response.status === 200) {
    yield put(TomatoActions.categoriesSuccess(response.data))
    console.log("response :", response)
  } else {
    yield put(TomatoActions.categoriesFailure(response.error))
    console.warn("error");
  }

  
}

