import React from 'react';//没有使用直接到React，我们仍必须引入React，不然会报错。猜测是后面引入的内容间接使用到了它
import ReactDOM from 'react-dom';
import Routers from './routers';
//import { AppContainer } from 'react-hot-loader';
import "./styles/app.scss";
if (module.hot) {
  console.log("**************************************module.hot");
  module.hot.accept(() => {
    ReactDOM.render(Routers, document.getElementById('root'));
  });
}
ReactDOM.render(Routers, document.getElementById('root'));

//不能在AppContainer下直接定义组件代码


