import React from 'react';

function Timer ({time, small = false}) {
    const seconds = Math.floor(time/1000).toString().padStart(2, '0');
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    const timeString = `${seconds}s ${milliseconds}ms`;

    return <div className={`timer ${small ? 'small' : ''}`}>{timeString}</div>;
}

export function App ({state, changeSubject}) {
    return (
        <div className="wrapper">
            <div className="main">
                <div className="buttons">
                    <button disabled={state.counting} onClick={() => changeSubject.next('start')}>Start</button>
                    <button disabled={state.counting} onClick={() => changeSubject.next('reset')}>Reset</button>
                    <button disabled={!state.counting} onClick={() => changeSubject.next('lap')}>Lap</button>
                    <button disabled={!state.counting} onClick={() => changeSubject.next('stop')}>Stop</button>
                </div>
                <Timer time={state.currentTime - state.startTime}  />
            </div>
            <ol className="laps">
                {state.laps.map((l, i) => <li key={i}><Timer time={l} small /></li>)}
            </ol>
        </div>
    );
}

export class AppContainer extends React.Component {
    state = {laps: []};

    update (state) {
        this.setState(state);
    }

    render () {
        return <App state={this.state}  changeSubject={this.props.changeSubject} />
    }
}
