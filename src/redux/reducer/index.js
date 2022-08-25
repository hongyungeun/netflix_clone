import {combineReducers} from 'redux'
import movieReducer from './movieReducer'
import movieListReducer from './movieListReducer'
export default combineReducers({  
  movie:movieReducer,
  movieList:movieListReducer
})