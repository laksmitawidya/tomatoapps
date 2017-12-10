import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import TomatoActions from '../Redux/TomatoRedux'
import AppConfig from '../Config/AppConfig'
import TomatoApi from '../Services/TomatoApi'

const Api = TomatoApi.create()
export function * categoriesRequest () {
  // make the call to the api
  const response = yield call(Api.callApi, AppConfig.baseURL+"categories", "GET","")
  console.log("response :", response)
  if (response.status === 200) {
    yield put(TomatoActions.categoriesSuccess(response.data))
    console.log("response :", response)
  } else {
    yield put(TomatoActions.categoriesFailure(response.error))
    console.log("error");
  }  
}

export function * filterByCityRequest (action) {
  console.log('Action filter by city: '+ action);
  // make the call to the api
  const response = yield call(Api.callApi, AppConfig.baseURL+"search?entity_id="+action.entity_id+"&entity_type=city&category="+action.category_id+"&order=asc", "GET","")
  console.log("response :", response)
  if (response.status === 200) {
    yield put(TomatoActions.filterByCitySuccess(response.data))
    console.log("response :", response)
  } else {
    yield put(TomatoActions.filterByCityFailure(response.error))
    console.log("error");
  }  
}

export function * switchEntity (action) {
  console.log("response action :", action)
  // make the call to the api
  const response = yield call(Api.callApi, AppConfig.baseURL+"search?entity_id="+action.entity_id+"&entity_type=city&order=asc", "GET","")
  console.log("response :", response)
  if (response.status === 200) {
    yield put(TomatoActions.switchEntity(response.data))
    console.log("response :", response)
  } else {
    yield put(TomatoActions.switchEntity(response.error))
    console.log("error");
  }  
}

