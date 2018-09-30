import React from 'react';
import { Router, Route, IndexRoute,browserHistory } from 'react-router';
import { LocaleProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Frame from "../layouts/Frame";
import Home from '../views/Home';
import Consume from '../views/Consume';

const Routers = (
  <LocaleProvider locale={zhCN}>
  <Router history={browserHistory}>
    <Route path="/" component={Frame}>
      <IndexRoute component={Home} />
      <Route path="/Consume" component={Consume} />
    </Route>
  </Router>
  </LocaleProvider>
);

export default Routers;