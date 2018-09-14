import store from "Core/Store";
import {fetchUahRate} from "Core/bank-gow-api";

export const checkUahRate = () => {
    fetchUahRate().then((rate) => {
        store.dispatch({
            type: "GLOBAL::SET_UAH_RATE",
            uahRate: rate
        });
    });
};