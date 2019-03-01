import React, { Component } from 'react';
import { Radio, Button } from 'antd';

import './ConfigModify.scss';
import GlobalConfig from './Components/GlobalConfig';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ConfigModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifyContentType: 'global',
        }
    }

    handleModifyContentType = (e) => {
        this.setState({
            modifyContentType: e.target.value
        })
    }

    render() {
        return (
            <div>
                <RadioGroup onChange={this.handleModifyContentType} defaultValue="global">
                    <RadioButton className="selectButton" value="global">全局参数</RadioButton>
                    <RadioButton className="selectButton" value="net">网络接口</RadioButton>
                    <RadioButton className="selectButton" value="keepalive">通信控制参数</RadioButton>
                    <RadioButton className="selectButton" value="station">站点</RadioButton>
                    <RadioButton className="selectButton" value="link">连接</RadioButton>
                </RadioGroup>
                <br/>
                <GlobalConfig />
                <Button type="primary">暂存</Button>
                <Button>保存</Button>
            </div>
        )
    }
}

export default ConfigModify;