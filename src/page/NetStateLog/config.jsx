import fetch from '../../common/fetch';

// const url = {
//     getClearLog: '/nms/gatexClearLog',
//     getGatexLog: '/nms/getGatexLog',
//     getDownloadLog: '/nms/produceGatexLogFile',
//     getProcessLog: '/nms/getSharedMemory',
// }

// mock
const url = {
    getClearLog: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/gatexClearLog',
    getGatexLog: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/getGatexLog',
    getDownloadLog: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/resetStationTraffic',
    getProcessLog: '',
}

export const getGatexLog= (query) => {
    const queryArr = Object.keys(query).map(key => key + "=" + query[key]);
    const queryStr = queryArr.join("&");
    const urlState = `${url.getGatexLog}?${queryStr}`;
    return fetch(urlState);
}
export const getClearLog = () => fetch(url.getClearLog);
export const getDownloadLog = () => fetch(url.getDownloadLog);
export const getProcessLog = () => fetch(url.getDownloadLog);
