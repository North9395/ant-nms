import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Table } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

import { stationNameAction } from '../../redux/action';
import { judge } from '../../common/util';
import { getGatexStatus, getStationTraffic } from './config';
import './InterfaceInfo.scss';
import { STATUS_CODES } from 'http';

class GatexState extends Component {
    constructor(props) {
        super(props);
        this.keepGatexStatus = true; //循环请求，页面Unmount停止
        this.getStatusTimer = null;
        this.getStatusInterval = 2000;
        this.state = {
            localStationName: '',
            netObj: {},
            tableData: [],
            pageCurNum: 1,
            stationNumPerPage: 10,
            interfaceColumnStatus: [],
            interfaceSourceStatus: [],
            interfaceTraffic: [],
        }
    }
    netDownAlart = (text, row, index) => {
        if (text && text.includes("X")) {
            return <p className="downTd" key={index}>{text}</p>
        }else{
            return <p key={index}>{text}</p>;
        }
    }

    getStatusInfo = () => {
        getGatexStatus()
            .then(data => {
                const newStatusArr = data;
                if(newStatusArr && newStatusArr.length > 0) {
                    let showStatusColumnData = [{title: '接口', key: 1, dataIndex: 0}];
                    let showStatusSourceData = [{0: '状态', key: 2}];
                    for(let i = 0; i < newStatusArr.length; i++) {
                        const key = Object.keys(newStatusArr[i])[0];
                        showStatusColumnData.push({
                            title: `LAN${key}`,
                            dataIndex: i + 1,
                            key: i + 2,
                            render: this.netDownAlart
                        });
                        showStatusSourceData[0][i + 1] = newStatusArr[i][key];
                    }
                    this.setState({
                        interfaceColumnStatus: showStatusColumnData,
                        interfaceSourceStatus: showStatusSourceData,
                    })
                }  
            })
            getStationTraffic()
                .then(data => {
                    const newTrafficArr = data;
                    if(newTrafficArr && newTrafficArr.length > 0) {
                        this.setState({
                            interfaceTraffic: newTrafficArr,
                        })
                    }  
                })
        if (this.getStatusTimer)
            clearTimeout(this.getStatusTimer)
        if (this.keepGatexStatus)
            setTimeout(this.getStatusInfo, this.getStatusInterval);

    }
    componentWillMount() {
        this.keepGatexStatus = true;
    }
    componentDidMount() {
        this.getStatusInfo();
    }
    componentWillUnmount() {
        this.keepGatexStatus = false;
    }
    render() {
        this.formatNumber = (text) => {
            return judge(text)
        };
        const { interfaceColumnStatus, interfaceSourceStatus, interfaceTraffic } = this.state;
        const { stationName } = this.props;

        return (
            
            <div>
                <Table dataSource={interfaceSourceStatus} columns={interfaceColumnStatus} id="interface-status">
                    <ColumnGroup title={`接口状态（当前登录站点：${stationName}）`} className="interface-status-captial">
                    </ColumnGroup>
                </Table>
                <Table dataSource={interfaceTraffic} id="interface-traffic">
                    <ColumnGroup title={`接口流量（当前登录站点：${stationName}）`} className="interface-traffic-captial">
                        <Column title="设备接口" dataIndex="interfacename" key="11"></Column>
                        <Column title="接口状态" dataIndex="state" key="12"></Column>
                        <ColumnGroup title="数据速率(包/秒)">
                            <Column title="接收" dataIndex="per_packets_recv" key="13" render={this.formatNumber}></Column>
                            <Column title="发送" dataIndex="per_packets_send" key="14" render={this.formatNumber}></Column>
                        </ColumnGroup>
                        <ColumnGroup title="数据速率(bps)">
                            <Column title="接收" dataIndex="per_bits_recv" key="15" render={this.formatNumber}></Column>
                            <Column title="发送" dataIndex="per_bits_send" key="16" render={this.formatNumber}></Column>
                        </ColumnGroup>
                        <ColumnGroup title="流量(包)">
                            <Column title="接收" dataIndex="total_packets_recv" key="17" render={this.formatNumber}></Column>
                            <Column title="发送" dataIndex="total_packets_send" key="18" render={this.formatNumber}></Column>
                        </ColumnGroup>
                        <ColumnGroup title="流量(字节)">
                            <Column title="接收" dataIndex="total_bytes_recv" key="19" render={this.formatNumber}></Column>
                            <Column title="发送" dataIndex="total_bytes_send" key="110" render={this.formatNumber}></Column>
                        </ColumnGroup>
                    </ColumnGroup>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stationName: state.stationName
  })
  
  const mapDispatchToProps = dispatch => ({
    stationNameAction: id => dispatch(stationNameAction(id))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(GatexState)