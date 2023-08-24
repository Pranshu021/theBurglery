import isLogged from './isLogged';
import isCustomOrder from './isCustomOrder';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loginInfo: isLogged,
    isCustomOrder: isCustomOrder,
});

export default allReducers;