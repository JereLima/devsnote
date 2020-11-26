import { combineReducers} from 'redux';
import NotesReducers from './NotesReducer';

export default combineReducers({
    notes:NotesReducers
});