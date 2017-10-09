import {Observable, Subject, Scheduler } from 'rxjs';
import { render } from 'react-dom';
import React from 'react';

import { AppContainer } from './view';
import {initialState, model} from './model';

const appContainer = document.getElementById('app');
const changeSubject = new Subject();
const appView = render(<AppContainer changeSubject={changeSubject} />, appContainer);

const state$ = changeSubject
    .startWith(initialState)
    .scan((prevState, change) => model(prevState, change));

const edge$ = state$
    .pluck('counting')
    .distinctUntilChanged()
    .map(val => val === true ? 1 : 0)
    .bufferCount(2, 2)
    .map(([prev, current]) => current - prev);

const startCounting$ = edge$.filter(x => x === 1);

const stopCounting$ = edge$.filter(x => x === -1);

Observable.interval(0, Scheduler.animationFrame)
    .skipUntil(startCounting$)
    .takeUntil(stopCounting$)
    .map(() => new Date())
    .subscribe(changeSubject);

state$
    .subscribe(state => appView.update(state));
