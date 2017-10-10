export default class AbstractAction {

    reducerKey = null;
    type = null;

    /**
     * @param reducerKey
     * @param type
     */
    constructor(reducerKey = null, type = null) {
        this.reducerKey = reducerKey;
        this.type = type;
    }

    /**
     * @return {*}
     */
    getReducerKey() {
        return this.reducerKey;
    }

    /**
     * @return {string}
     */
    getType() {
        return this.type;
    }

    dispatch(state = {}) {
        return state;
    }
}