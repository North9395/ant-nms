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

export const localTableData = {
    "gatexState": {
        "network": [
          {
            "wennet": "办公",
            "vdonet": "视频",
            "bknet": "备网"
          }
        ],
        "station": [
          {
            "bknet": "连接",
            "city": "北京",
            "wennet": "断开",
            "vdonet": "连接"
          }
        ]
      },
      "pageInfo": {
        "pageInfo": [
          {
            "pageTotalNum": "1",
            "stationTotalNum": "2"
          }
        ]
      }
}
// 全局 表格展示数据
export const globalTableData = {
    "gatexState": {
        "network": [
          {
            "huanet": "语音",
            "wennet": "办公",
            "vdonet": "视频",
            "bknet": "备网"
          }
        ],
        "station": [
          {
            "bknet": "连接",
            "city1": "北京",
            "city2": "南京",
            "wennet": "断开",
            "vdonet": "连接"
          },
          {
              "bknet": "连接",
              "city1": "北京",
              "city2": "成都",
              "huanet": "断开",
              "wennet": "连接",
              "vdonet": "空闲"
          },
          {
            "bknet": "连接",
            "city1": "北京",
            "city2": "沈阳",
            "huanet": "连接",
            "wennet": "连接"
          }
        ]
      },
      "pageInfo": {
        "pageInfo": [
          {
            "pageTotalNum": "1",
            "stationTotalNum": "2"
          }
        ]
      }
}