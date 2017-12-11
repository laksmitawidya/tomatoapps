import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  /* ------------ Categories Request -------------- */
  categoriesRequest : null,
  categoriesSuccess : ['categoriesPayload'],
  categoriesFailure : ['categoriesError'],

  /* ------------ Filter by City Request -------------- */
  filterByCityRequest : ['entity_id', 'category_id'],
  filterByCitySuccess : ['filterByCityPayload'],
  filterByCityFailure : ['filterByCityError'],

  switchEntity: ['entity_id'],

  getRestaurantRequest : ['entity_id', 'category_id', 'restaurant_id'],
  getRestaurantSuccess : ['getRestaurantPayload'],
  getRestaurantFailure : ['getRestaurantError'],

})

export const TomatoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  /* ------------ Categories Initial State ------------- */
  categoriesPayload: null,
  categoriesError: null,
  categoriesFetching: false,

  /* --------------- Filter Initial State -------------- */
  filterByCityPayload: null,
  filterByCityError: null,
  filterByCityFetching: false,
  entity_id : 280, 
  category_id: null,

  res_id:null
})

/* ------------- Reducers Categories Request ------------- */

export const categoriesRequest = (state) => state.merge({ categoriesFetching: true })


export const categoriesSuccess = (state, action) => {
    const { categoriesPayload } = action
    return state.merge({ categoriesFetching:false, categoriesError:null, categoriesPayload })
}

export const categoriesFailure = (state, action) => state.merge({ categoriesFetching: false, categoriesError: action.categoriesError })

/* ------------- Reducers Filter By City Request ------------- */

export const filterByCityRequest = (state, action) => state.merge({ filterByCityFetching: true, category_id: action.category_id, entity_id:action.entity_id })


export const filterByCitySuccess = (state, action) => {
    const { filterByCityPayload } = action
    return state.merge({ filterByCityFetching:false, filterByCityError:null, filterByCityPayload })
}

export const filterByCityFailure = (state, action) => state.merge({ filterByCityFetching: false, filterByCityError: action.filterByCityError })

export const switchEntity = (state, action) => state.merge({ entity_id: action.entity_id })

export const getRestaurantRequest = (state, action) => state.merge({ getRestaurantFetching: true, res_id:action.restaurant_id })

export const getRestaurantSuccess = (state, action) => {
    const { getRestaurantPayload } = action
    return state.merge({ getRestaurantFetching:false, getRestaurantError:null, getRestaurantPayload })
}

export const getRestaurantFailure = (state, action) => state.merge({ getRestaurantFetching: false, getRestaurantError: action.getRestaurantError })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  /* ------------- Hookup Categories ------------- */
  [Types.CATEGORIES_REQUEST]: categoriesRequest,
  [Types.CATEGORIES_SUCCESS]: categoriesSuccess,
  [Types.CATEGORIES_FAILURE]: categoriesFailure,

  /* ------------- Hookup Filter by City ------------- */
  [Types.FILTER_BY_CITY_REQUEST]: filterByCityRequest,
  [Types.FILTER_BY_CITY_SUCCESS]: filterByCitySuccess,
  [Types.FILTER_BY_CITY_FAILURE]: filterByCityFailure,

  [Types.SWITCH_ENTITY]: switchEntity,

  [Types.GET_RESTAURANT_REQUEST]: getRestaurantRequest,
  [Types.GET_RESTAURANT_SUCCESS]: getRestaurantSuccess,
  [Types.GET_RESTAURANT_FAILURE]: getRestaurantFailure

})
