import counter from "./counter";
import kanbanData from "./kanbanData";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    counter, kanbanData
});

export default rootReducer;