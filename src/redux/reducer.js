const reducer = (state = {}, action) => {
    switch(action.type) {
        case 'TRAP_CHANGED':
            return {
                ...state,
                stateInfo: action.stateInfo,
            }
        case 'STATE_CHANGED':
            return {
                ...state,
                trapInfo: action.trapInfo,
            }
        case 'STATION_NAME_CHANGED':
            return {
                ...state,
                stationName: action.stationName,
            }
        default:
            return state;
    }
}

export default reducer;