import React, { Component } from 'react';
import { Table, Select, Spin, Popconfirm, message } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

import { typeOf } from '../../common/util';
import { getGatexLog, getClearLog, getDownloadLog, getProcessLog } from './config';
import './netStateLog.scss';
import { Button } from 'antd/lib/radio';


class NetStateLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logType: 'bknet',
            logPeriod: 1,
            bknetData: [],
            eventData: [],
            linkData: [],
            logNumPerPage: 600,
            currentPage: 1,
            defaultLogType: 'bknet',
            isLoading: false,
            tip: 'Loading...',
            logTotalNum: null,
            pageTotalNum: null,
        }
    }
    getLog = (query, type) => {
        getGatexLog(query)
            .then(data => {
                let { contentInfo } = data;
                let showData = [];
                for (let i = 0; i < contentInfo.length; i++) {
                    showData.push({
                        ...contentInfo[i],
                        key: i,
                    })
                } 
                this.setState({
                    logTotalNum: data.pageInfo[0].logTotalNum,
                    pageTotalNum: data.pageInfo[0].pageTotalNum,
                })
                switch(type) {
                    case 'bknet':
                        
                        this.setState({
                            bknetData: showData,
                            isLoading: false,
                        })
                        break;
                    case 'link':
                        this.setState({
                            linkData: showData,
                            isLoading: false,
                        })
                        break;
                    case 'event':
                        this.setState({
                            eventData: showData,
                            isLoading: false,
                        })
                        break;
                    default:
                }
            })
    }
    handleLogTypeChange = (value) => {
        this.setState({
            isLoading: true,
        })
        localStorage.setItem('logType', value);
        const query = {
            currentPage: this.state.currentPage,
            logType: value,
            logNumPerPage: this.state.logNumPerPage,
            logPeriod: this.state.logPeriod,
        }
        this.setState({
            logType: value,
        })
        this.getLog(query, value);
    }

    handleLogPeriodChange = (value) => {
        this.setState({
            isLoading: true,
        })
        const query = {
            currentPage: this.state.currentPage,
            logType: this.state.logType,
            logNumPerPage: this.state.logNumPerPage,
            logPeriod: value,
        }
        this.setState({
            logPeriod: value,
        })
        this.getLog(query, this.state.logType);
        
    }
    confirmDelete = () => {
        this.setState({
            isLoading: true,
        })
        getClearLog()
            .then(data => {
                if(data === 'success' || data.data === 'success')
                    message.success('日志清除成功');
                else 
                    message.error('日志清除失败')
                this.setState({
                    isLoading: false,
                })
            })
    }
    componentWillMount() {
        const type = localStorage.getItem('logType');
        if (type && type !== 'bknet') {
            this.setState({
                defaultLogType: type,
            })
        }
        const query = {
            currentPage: this.state.currentPage,
            logType: type,
            logNumPerPage: this.state.logNumPerPage,
            logPeriod: this.state.logPeriod,
        }
        this.getLog(query, type);
    }

    componentDidMount() {
        
    }
    render() {
        this.formatUndefined = (text) => {
            if(typeOf(text) === 'null' || typeOf(text) === 'undefined') {
                return ""
            }else {
                return text;
            }
        };
        const { bknetData, eventData, linkData, logType, defaultLogType, tip, isLoading, logTotalNum } = this.state;
        return (
            <Spin tip={tip} spinning={isLoading}>
                <label htmlFor="switchLog">日志类型选择</label>
                <Select id="switchLog" onChange={this.handleLogTypeChange} defaultValue={defaultLogType}>
                    <Select.Option id="bknet" value ="bknet">备用网络启用日志</Select.Option>
                    <Select.Option id="link" value ="link">链路状态日志</Select.Option>
                    <Select.Option id="event" value="event">事件日志</Select.Option>
                </Select>
                <label htmlFor="selectDate">日志时间范围选择</label>
                <Select id="selectDate" onChange={this.handleLogPeriodChange} defaultValue={1}>
                    <Select.Option key="1" value={1}>24小时内</Select.Option>
                    <Select.Option key="2" value={2}>最近2天</Select.Option>
                    <Select.Option key="3" value={3}>最近3天</Select.Option>
                    <Select.Option key="4" value={4}>最近4天</Select.Option>
                    <Select.Option key="5" value={5}>最近5天</Select.Option>
                    <Select.Option key="6" value={6}>最近6天</Select.Option>
                    <Select.Option key="7" value={7}>最近1周</Select.Option>
                </Select>
                <br/>
                <Button className="logBtn" onclick={() => {
                    const { currentPage, logType, logNumPerPage, logPeriod} = this.state;
                    const query = {
                        currentPage: currentPage,
                        logType: logType,
                        logNumPerPage: logNumPerPage,
                        logPeriod: logPeriod,
                    }
                    this.getLog(query, logType);
                }}>刷新日志</Button>
                <Button className="logBtn"  onclick={() => {}}>下载全部日志</Button>
                <Popconfirm title="你确信要清除所有日志？" onConfirm={this.confirmDelete} okText="是" cancelText="否">
                    <Button className="logBtn" onclick={() => {}}>清空日志</Button>
                </Popconfirm>
                <Table 
                    id="interface-status"
                    dataSource={bknetData}
                    style={{"display": logType === 'bknet' ? 'block' : 'none'}}
                >
                    <ColumnGroup title="备用网络启用日志(注*  发送M:发送镜像口数据至备网,发送N:发送业务口数据至备网)" className="interface-status-captial">
                        <Column title="日期" dataIndex="logdate" key="1" render={this.formatUndefined}></Column>
                        <Column title="时间" dataIndex="logtime" key="2" render={this.formatUndefined}></Column>
                        <Column title="站点" dataIndex="station" key="3" render={this.formatUndefined}></Column>
                        <Column title="网络" dataIndex="net" key="4" render={this.formatUndefined}></Column>
                        <Column title="方向*" dataIndex="direct" key="5" render={this.formatUndefined}></Column>
                        <Column title="活动时长" dataIndex="total_time" key="6" render={this.formatUndefined}></Column>
                        <Column title="流量(包)" dataIndex="total_packets" key="7" render={this.formatUndefined}></Column>
                        <Column title="流量(字节)" dataIndex="total_bytes" key="8" render={this.formatUndefined}></Column>
                    </ColumnGroup>
                </Table>
                <Table 
                    id="interface-status"
                    dataSource={linkData}
                    style={{"display": logType === 'link' ? 'block' : 'none'}}
                >
                    <ColumnGroup title={`链路状态日志（共${logTotalNum}条）`} className="interface-status-captial">
                        <Column title="日期" dataIndex="date" key="1" render={this.formatUndefined}></Column>
                        <Column title="站点" dataIndex="station" key="2" render={this.formatUndefined}></Column>
                        <Column title="网络" dataIndex="net" key="3" render={this.formatUndefined}></Column>
                        <Column title="活动时长" dataIndex="time" key="4" render={this.formatUndefined}></Column>
                        <Column title="初状态" dataIndex="initialstate" key="5" render={this.formatUndefined}></Column>
                        <Column title="末状态" dataIndex="finalstate" key="6" render={this.formatUndefined}></Column>
                    </ColumnGroup>
                </Table>
                <Table 
                    id="interface-status"
                    dataSource={eventData}
                    style={{"display": logType === 'event' ? 'block' : 'none'}}
                >
                    <ColumnGroup title="备用网络启用日志(注*  发送M:发送镜像口数据至备网,发送N:发送业务口数据至备网)" className="interface-status-captial">
                        <Column title="日期" dataIndex="logdate" key="1"></Column>
                        <Column title="时间" dataIndex="logtime" key="2"></Column>
                        <Column title="事件" dataIndex="station" key="3"></Column>
                    </ColumnGroup>
                </Table>
                
            </Spin>
        )
    }
}

export default NetStateLog;