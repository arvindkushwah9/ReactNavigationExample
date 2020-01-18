import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import ProjectReducer from './ProjectReducer'
import VegetableReducer from './VegetableReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  project: ProjectReducer,
  vegetables: VegetableReducer,
});
export default rootReducer;