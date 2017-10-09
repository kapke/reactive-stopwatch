export const initialState = {
    counting: false,
    startTime: null,
    currentTime: null,
    laps: [],
}

export function model (state, change) {
    if (change === 'start') {
        return {
            ...state,
            counting: true,
            startTime: new Date(),
            laps: [],
        };
    } else if (change === 'lap') {
        return {
            ...state,
            laps: state.laps.concat(state.currentTime - state.startTime),
        }
    } else if (change === 'stop') {
        return {
            ...state,
            counting: false,
            currentTime: new Date(),
        };
    } else if (change === 'reset') {
        return {
            ...state,
            startTime: null,
            currentTime: null,
            laps: [],
        };
    } else if (change instanceof Date && state.counting) {
        return {
            ...state,
            currentTime: change,
        };
    } else {
        return state
    }
}
