import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoriesRequest : null,
  categoriesSuccess : ['categoriesPayload'],
  categoriesFailure : ['categoriesError']
})

export const TomatoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categoriesPayload: null,
  categoriesError: null,
  categoriesFetching: false
})

/* ------------- Reducers ------------- */

export const categoriesRequest = (state) => state.merge({ categoriesFetching: true })


export const categoriesSuccess = (state, action) => {
    const { categoriesPayload } = action
    return state.merge({ categoriesFetching:false, categoriesError:null, categoriesPayload })
}

export const categoriesFailure = (state, action) => state.merge({ categoriesFetching: false, categoriesError: action.categoriesError })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORIES_REQUEST]: categoriesRequest,
  [Types.CATEGORIES_SUCCESS]: categoriesSuccess,
  [Types.CATEGORIES_FAILURE]: categoriesFailure
})
