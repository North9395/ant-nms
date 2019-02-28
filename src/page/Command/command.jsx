/*create date: 19/11/4
 *last change: 19/11/4
 *遗留问题：
 * 1. fetch中的问题不能 Promise.reject 不然报 unhandle error错误
 * 
*/
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Form, Input, Icon, Button, message } from 'antd';

import { executeCommandFetch } from './config';
import './command.scss';

const FormItem = Form.Item;

class Command extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
        this.keepGetting = true;
        this.state = {
            isSubmitCheck: false,
            showCmdRes: '',
        };
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    static defaultProps = {
        isSubmitCheck: false,
        user: 'admin',
        pwd: 'admin',
    }
    
    componentWillMount() {
        this.props.form.validateFields();
    }
    componentWillUnmount() {
        this.keepGetting = false;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,value) => {
            if (!err) {
                this.getCmdRes();
            }
        })
    }
    getCmdRes = () => {
        var data = {};
        var { getFieldValue } = this.props.form;
        data.command = getFieldValue('command');
        data.refresh = getFieldValue('refresh');
        executeCommandFetch('post', data)
            .then(res => {
                this.setState({
                    showCmdRes: res.data,
                })
            })
            .catch(e => {
                message.error('执行失败');
            })
        if (this.timer)
            clearTimeout(this.timer);
        if(this.keepGetting)
            this.timer = setTimeout(this.getCmdRes, data.refresh * 1000);
    }
    render() {
        const { showCmdRes } = this.state;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const { getFieldDecorator, getFieldsError,  } = this.props.form;
        // const _form =  this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="change-pwd-form">
                <FormItem label="命令:" {...formItemLayout} >
                    {getFieldDecorator('command', {
                        rules: [{ required: true, message: '请输入命令!' }],
                    })(
                        <Input prefix={<Icon type="build" style={{ color: 'rgba(0,0,0,.25)' }} />} type="String"/>
                    )}
                </FormItem>
                <FormItem label="刷新时间:" {...formItemLayout}>
                        {getFieldDecorator('refresh', {
                            rules: [{ required: true, message: '请输入刷新时间'}],
                            pattern: /\d+/,
                        })(
                            <Input prefix={<Icon type="dashboard" style={{ color: 'rgba(0,0,0,.25)' }} />} type="Number" />
                        )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        提交
                    </Button>
                </FormItem>
                <div className="showCmdRes">{showCmdRes}</div>
            </Form>

        );
    }
}


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

const WrappedNormalLoginForm = Form.create()(Command);
export default WrappedNormalLoginForm;