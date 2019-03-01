import {createStore} from 'redux';
import reducer from './reducer.js';

const initValues = {
    stateInfo : '',
    trapInfo : '',
    stationName : ''
}

const store = createStore(reducer, initValues);

export default store;