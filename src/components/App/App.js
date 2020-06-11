import React from 'react';
import './App.css';

//导入路由
import Route from '../route/route';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callBack: '',
    }
    this.testAPi = this.testAPi.bind(this);
  }
  //cg 链接测试
  testAPi() {
   fetch('http://192.168.10.227:3000/api/cg/connect', {
     method: 'get'
   }).then(response => {
     if (response.ok) {
      return response.text()
     }
   })
      .then(res => this.setState({callBack: res}))
   }

  render() {
    return(
        <Route/>
    );
  }
}

export default App;
