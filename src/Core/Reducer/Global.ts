import {IGlobalStore} from 'Core/Interfaces/Store';

const initialState: IGlobalStore = {};

/**
 * @param state
 * @returns {IGlobalStore}
 */
export default function globalState(state: IGlobalStore = initialState) {
    return state;
}