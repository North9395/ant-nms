import fetch from '../../common/fetch';

const url = {
    changePwd: '/changePasswd',
}

export const changePwdFetch = (method, body) => fetch(url.changePwd, method, body);