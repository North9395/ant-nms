import fetch from '../../common/fetch';

// const url = {
//     login: '/nms/login',
// }

const url = {
    login: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/changePasswd',
}

export const changePwdFetch = (method, body) => fetch(url.login, method, body);