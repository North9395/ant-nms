import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import Trap from '../../components/trap/trap';

import './layout.scss';

const { Header, Content, Footer, Sider } = Layout;

class SiderLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  componentDidMount() {
    console.log("11111111111111111")
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}></div>
          <Menu theme="dark" defaultSelectedKeys={['gatexstate']} mode="inline">
            <Menu.Item key="gatexstate">
              <Link to="/gatexstate">
                <Icon type="cluster" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>站点状态</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="allState">
              <Link to="/allState">
                <Icon type="align-left" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>所有站点状态</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="gatexstatus">
              <Link to="/gatexstatus">
                <Icon type="project" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>接口信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="gatexlog">
              <Link to="/gatexlog">
                <Icon type="table" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>日志信息</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="deltaConfig">
              <Link to="/deltaConfig">
                <Icon type="hdd" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>配置管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="rtt">
              <Link to="/rtt">
                <Icon type="stock" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>心跳展示</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="passwdconfig">
              <Link to="/passwdconfig">
                <Icon type="form" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>修改口令</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to="/logout">
                <Icon type="close" theme="outlined" />
                <span style={{"visibility": this.state.collapsed ? 'hidden' : 'visible'}}>退出系统</span>
              
              </Link>
            </Menu.Item>     
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Trap />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            IP流量切换器管理系统
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default  SiderLayout;