import React from 'react';
import {render} from 'react-dom';
import PopupApplication from 'Popup/index';
import 'Popup/Analytics';

const onContentLoaded = () => {
    let ComponentElement = document.getElementById('popup-application');

    try {
        render(<PopupApplication />, ComponentElement);
    } catch (exception) {
        ComponentElement.innerHTML = 'Something wrong!';
        console.error(
            "\n Error in React component:\n ------------------------------ \n",
            exception
        );
    }
};

document.addEventListener('DOMContentLoaded', onContentLoaded);

