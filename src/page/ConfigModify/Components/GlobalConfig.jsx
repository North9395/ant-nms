import React, { Component } from 'react';
import { Table, Tooltip ,  } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

import {globalData} from'./TestData';
import { typeOf } from '../../../common/util';
import './all.scss'

class ConfigModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        }
    }
    
    showDescription = (text, record) => {
        if(record.help) {
            return(
                <Tooltip title={record.help} >
                    <span className="descriptionSpan">
                        {text}
                    </span>
                </Tooltip >
            )
        }
    }

    formatData = (data) => {
        data = globalData;
        const tableData = [];
        for(let temp of data) {
            let help = false;
            if (temp.HELP) {
                if (typeOf(temp.HELP.P) === 'array') {
                    help = temp.HELP.P.join('\n');
                }else {
                    help = temp.HELP.P;
                }
            }
            const tempValue = {
                key: temp["@name"],
                cnName: temp.DESCRIPTION,
                globalValue: temp.VALUE.toString(),
                help: help,
            }
            tableData.push(tempValue);
        }
        this.setState({
            tableData: tableData
        })
    }

    componentDidMount() {
        this.formatData();
    }

    render() {
        console.log(tableData)
        const { tableData } = this.state;
        return (
            <Table dataSource={tableData}>
            <ColumnGroup title="全局配置参数修改表" className="state-captial">
                <Column
                    title="配置项中文名"
                    dataIndex="cnName"
                    key="cnName"
                    render = {this.showDescription}
                />
                <Column
                    title="配置项值"
                    dataIndex="globalValue"
                    key="globalValue"
                />
            </ColumnGroup>
        </Table>
        )
    }
}


export default ConfigModify;