import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import Head from "./Head";
import Nav from "./Nav";
class Frame extends Component {
  
  render() {
    return (
      <Layout>
        <Header>
          <Head/>
        </Header>
        <Layout>
          <Sider>
            <Nav/>
          </Sider>
          <Content>
            {this.props.children}
          </Content>
        </Layout>
        <Footer>Footer</Footer>
    </Layout>
    );
  }
}
export default Frame;