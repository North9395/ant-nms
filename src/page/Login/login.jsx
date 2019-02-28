/*create date: 19/11/4
 *last change: 19/11/4
 *遗留问题：
 * 1. fetch中的问题不能 Promise.reject 不然报 unhandle error错误
 * 
*/
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Form, Input, Icon, Button, message } from 'antd';

import { changePwdFetch } from './config';
import './login.scss';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitCheck: false,
            user: 'admin',
            pwd: 'admin',
            show: '',
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
    handleSubmit = (e) => {
        const { match, location, history } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err,value) => {
            if (!err) {
                var data = {};
                var { getFieldValue } = this.props.form;
                data.user = getFieldValue('userName');
                data.passwd = getFieldValue('password');
                data.passwdAgain = getFieldValue('password');
                changePwdFetch('post', data)
                    .then(res => {
                        console.log(res)
                        if (res === "success" || res.data === "success") {
                            message.success('登录成功');
                            localStorage.setItem('user', data.user);
                            localStorage.setItem('password', data.passwd);
                            setTimeout(function() {
                                console.log(match, location, history)
                                history.push('/gatexState');
                            }, 1000);
                        }else {
                            message.error('登录失败');
                        }
                        
                    })
                    .catch(e => {
                        message.error('登录失败');
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
        // const _form =  this.props.form;
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
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        登录
                    </Button>
                </FormItem>
            </Form>

        );
    }
}

const LoginWithRouter = withRouter(Login);

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

const WrappedNormalLoginForm = Form.create()(LoginWithRouter);
export default WrappedNormalLoginForm;