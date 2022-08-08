import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducer/index'

let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export default store