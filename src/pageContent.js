import React from 'react';
import {render} from 'react-dom';
import PageBudgetApplication from 'PageContent/index';

const onContentLoaded = () => {
    let componentElement = document.createElement('div');
    let componentBody = document.getElementsByTagName('body')[0];

    if (!componentBody) {
        return;
    }

    try {
        render(<PageBudgetApplication />, componentElement);
        componentBody.appendChild(componentElement);
    } catch (exception) {
        console.error(
            "\n Error in Kuna Ticker component:\n ------------------------------ \n",
            exception
        );
    }
};

document.addEventListener('DOMContentLoaded', onContentLoaded);