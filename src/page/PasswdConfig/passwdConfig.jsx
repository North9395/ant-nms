/*create date: 19/11/4
 *last change: 19/11/4
 *遗留问题：
 * 1. fetch中的问题不能 Promise.reject 不然报 unhandle error错误
 * 
*/
import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

import { changePwdFetch } from './config';
import './PasswdConfig.scss';

const FormItem = Form.Item;

class PasswdConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitCheck: false,
            user: 'admin',
            pwd: 'admin',
            show: '',
        };
    }
    static defaultProps = {
        isSubmitCheck: false,
        user: 'admin',
        pwd: 'admin',
    }
    
    componentWillMount() {
        this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.form);
        this.props.form.validateFields((err,value) => {
            if (!err) {
                var data = {};
                var { getFieldValue } = this.props.form;
                data.user = getFieldValue('userName');
                data.passwd = getFieldValue('password');
                data.passwdAgain = getFieldValue('password');
                changePwdFetch('post', data)
                    .then(res => {
                        console.log('success');
                        //跳转到首页
                    })
                    .catch(e => {
                        console.log('error');
                    })
            }
        })
    }
    render() {
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
        const _form =  this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="change-pwd-form">
                <FormItem label="用户名" {...formItemLayout} >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                        initialValue: 'admin',
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                    )}
                </FormItem>
                <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码'}],
                            initialValue: 'admin',
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                        )}
                </FormItem>
                <FormItem label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                { required: true, message: '请确认密码'},
                                {
                                    validator(rule, values, callback) {
                                        var pwd = _form.getFieldValue('password');
                                        if (pwd === values) callback();
                                        else callback('两次输入密码不一致'); 
                                    }
                                }
                            ],
                            initialValue: 'admin',
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
                        )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        修改密码
                    </Button>
                </FormItem>
            </Form>

        );
    }
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

const WrappedNormalLoginForm = Form.create()(PasswdConfig);
export default WrappedNormalLoginForm;