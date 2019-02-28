import fetch from '../../common/fetch';

// const url = {
//     executeCommand: '/nms/executeCommand',
// }

const url = {
    executeCommand: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/executeCommand',
}

export const executeCommandFetch = (method, body) => fetch(url.executeCommand, method, body);