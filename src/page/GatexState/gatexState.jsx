import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Table, Switch } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

import { stationNameAction } from '../../redux/action';
import { getGatexState, getLocalStation } from './config';
import './gatexState.scss';

class GatexState extends Component {
    constructor(props) {
        super(props);
        this.keepGatexState = true; //循环请求，页面Unmount停止
        this.getStateTimer = null;
        this.getStateInterval = 2000;
        this.state = {
            netObj: {},
            tableData: [],
            pageCurNum: 1,
            stationNumPerPage: 10,
            tableMode: true,
            localMode: true,
        }
        // this.handleTableModeChange = this.handleTableModeChange.bind(this);
        // this.handleLocalModeChange = this.handleLocalModeChange.bind(this);
    }

    handleLocalModeChange = (checked) => {
        this.setState({
            tableMode: checked,
        })
    }

    handleTableModeChange = (checked) => {
        this.setState({
            localMode: checked,
        })
    }

    getStateName = () => {
        getLocalStation()
            .then(data => {
                console.log(data);
                this.setState({
                    localStationName: data.localStationName,
                })
                stationNameAction(data.localStationName);
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
                if (this.keepGatexState){
                    this.setState({
                        tableData: newTableData
                    })
                }   
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
        this.netDownAlart = (text, row, index) => {
            if (text && text.includes("断开")) {
                return <p className="downTd">{text}</p>
            }else{
                return <p>{text}</p>;
            }
        }
        const { localStationName, netObj, tableData, tableMode, localMode } = this.state;
        const stateColumn = Object.keys(netObj).map((key, index) => {
            return <Column title={netObj[key]} dataIndex={key} key={index} render={this.netDownAlart}/>
        })
        return (
            <div>
                <Switch checkedChildren="表格" unCheckedChildren="地图" defaultChecked onChange={(checked) => {this.handleTableModeChange(checked)}}/>
                <Switch checkedChildren="本地" unCheckedChildren="全网" defaultChecked onChange={(checked) => {this.handleLocalModeChange(checked)}}/>
                {tableMode && localMode && <Table dataSource={tableData}>
                    <ColumnGroup title={`站点状态（当前登录站点：${localStationName}）`} className="state-captial">
                        <Column title="站点名" dataIndex="city" />
                        <ColumnGroup title="状态">
                            {stateColumn}
                        </ColumnGroup>
                    </ColumnGroup>
                </Table>}
                {tableMode && !localMode && <Table dataSource={tableData}>
                    <ColumnGroup title={`站点状态（当前登录站点：${localStationName}）`} className="state-captial">
                        <Column title="站点名" dataIndex="city" />
                        <ColumnGroup title="状态">
                            {stateColumn}
                        </ColumnGroup>
                    </ColumnGroup>
                </Table>}
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