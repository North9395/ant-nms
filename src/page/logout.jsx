import React, { Component } from 'react';

class Login extends Component {
    render() {
        localStorage.removeItem('user');
        localStorage.removeItem('password');
        return (
            <p>注销成功</p>
        )
    }
}

export default Login;