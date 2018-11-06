import React, { Component } from 'react';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

import { getGatexState, getLocalStation } from './config';
import './gatexState.scss';

class GatexState extends Component {
    constructor(props) {
        super(props);
        this.keepGatexState = true; //循环请求，页面Unmount停止
        this.getStateTimer = null;
        this.getStateInterval = 2000;
        this.state = {
            localStationName: '',
            netObj: {},
            tableData: [],
            pageCurNum: 1,
            stationNumPerPage: 10
        }
    }

    getStateName = () => {
        getLocalStation()
            .then(data => {
                this.setState({
                    localStationName: data.localStationName,
                })
            })
            .catch(e => {})
    }

    getState = () => {
        const query = {
            pageCurNum: this.state.pageCurNum,
            stationNumPerPage: this.state.stationNumPerPage,
        }
        getGatexState(query)
            .then(data => {
                const newNetObj = data.gatexState.network[0];
                const { netObj } = this.state;
                const preNetArr = Object.keys(netObj);
                const curNetArr = Object.keys(newNetObj);

                if (preNetArr.length !== curNetArr.length) {
                    this.setState({
                        netObj: newNetObj
                    })
                }else {
                    for (let net of curNetArr) {
                        if(!preNetArr.includes(net)) {
                            this.setState({
                                netObj: newNetObj
                            })
                            break;
                        }
                    }
                }

                const newTableData = [];
                const { station } = data.gatexState;
                for (let i = 1; i <= station.length; i++) {
                    newTableData.push({
                        key: i,
                        ...station[i - 1],
                    })
                }
                this.setState({
                    tableData: newTableData
                })
            })
        if (this.getStateTimer)
            clearTimeout(this.getStateTimer)
        if (this.keepGatexState)
            setTimeout(this.getState, this.getStateInterval);

    }
    componentWillMount() {
        this.keepGatexState = true;
        this.getStateName();
    }
    componentDidMount() {
        this.getState();
    }
    componentWillUnmount() {
        this.keepGatexState = false;
    }
    render() {
        const { localStationName, netObj, tableData } = this.state;
        const stateColumn = Object.keys(netObj).map((key, index) => {
            return <Column title={netObj[key]} dataIndex={key} key={index} />
        })
        return (
            <Table dataSource={tableData}>
                <ColumnGroup title={`站点状态（当前登录站点：${localStationName}）`} className="state-captial">
                    <Column title="站点名" dataIndex="city" />
                    <ColumnGroup title="状态">
                        {stateColumn}
                    </ColumnGroup>
                </ColumnGroup>
            </Table>
        )
    }
}

export default GatexState;