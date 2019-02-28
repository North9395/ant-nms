import fetch from '../../common/fetch';

// const url = {
//     changePwd: '/nms/changePasswd',
// }

const url = {
    changePwd: 'https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/changePasswd',
}

export const changePwdFetch = (method, body) => fetch(url.changePwd, method, body);