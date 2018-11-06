import fetch from '../../common/fetch';

const url = {
    getTrap: '/nms/getWarningMessage',
    mock: "https://www.easy-mock.com/mock/5be0076b90f6c10b3df6c282/example/nms/getWarningMessage"
}
export const getTrap = () => fetch(url.mock);
