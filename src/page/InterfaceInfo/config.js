import fetch from '../../common/fetch';

// const url = {
//     getStationTraffic: '/nms/getStationTraffic',
//     getGatexStatus: '/nms/getGatexStatus',
//     getResetTraffic： '/nms/resetStationTraffic',
// }

// mock
const url = {
    getStationTraffic: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/getStationTraffic',
    getGatexStatus: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/getGatexStatus',
    getResetTraffic: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/resetStationTraffic',
}

export const getStationTraffic = () => fetch(url.getStationTraffic);
export const getGatexStatus = () => fetch(url.getGatexStatus);
export const getResetTraffic = () => fetch(url.getResetTraffic);
