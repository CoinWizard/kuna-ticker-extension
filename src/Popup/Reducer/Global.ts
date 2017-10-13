import {GlobalStateInterface} from 'Popup/Reducer/Interfaces/GlobalStateInterface';

const initialState: GlobalStateInterface = {};

/**
 * @param state
 * @returns {GlobalStateInterface}
 */
export default function globalState(state: GlobalStateInterface = initialState) {
    return state;
}