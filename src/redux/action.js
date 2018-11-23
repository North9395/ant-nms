const TRAP_CHANGED = 'TRAP_CHANGED';
const STATE_CHANGED = 'STATE_CHANGED';
const STATION_NAME_CHANGED = 'STATION_NAME_CHANGED';

export const trapAction = text => ({
    type: TRAP_CHANGED,
    trapInfo: text,
})

export const stateAction = text => ({
    type: STATE_CHANGED,
    stateInfo: text,
})

export const stationNameAction = text => ({
    type: STATION_NAME_CHANGED,
    stationName: text,
})