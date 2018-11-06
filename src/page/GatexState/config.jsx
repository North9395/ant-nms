import fetch from '../../common/fetch';

// const url = {
//     getGatexState: '/nms/getGatexState',
//     getLocalStation: '/nms/getLocalStationName',
// }

// mock
const url = {
    getGatexState: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/getGatexState',
    getLocalStation: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/getLocalStationName',
}
export const getGatexState= (query) => {
    const queryArr = Object.keys(query).map(key => key + "=" + query[key]);
    const queryStr = queryArr.join("&");
    const urlState = `${url.getGatexState}?${queryStr}`;
    return fetch(urlState);
}

export const getLocalStation = () => fetch(url.getLocalStation);