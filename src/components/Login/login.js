     import React from 'react';
     import { Link } from "react-router-dom";


     class Login extends React.Component {
       constructor(props) {
         super(props);
         this.state = {
           connect: false
         }

         this.handleSubmit = this.handleSubmit.bind(this);
       }
      //根据输入的地址连接atem 和cg
      //目前只是测试，虚构成功连接
       handleSubmit() {
         this.setState({connect: true})
       }


       //连接成功显示设置按钮
       successConnect() {
         if (this.state.connect) { 
         return (
          <Link to="/control-center">
          <button variant="outlined">
            进入
          </button>
          </Link>
         )
         }
       }

       render(){
         return(
          <div>
            <label htmlFor='casparcg'>cg服务器</label>
            <input type='text' name='casparcg' id='casparcg'/>
            <br />
            <label htmlFor='casparcg'>atem</label>
            <input type='text' name='casparcg' id='casparcg'/>
            <input type='submit' value='连接' onClick={this.handleSubmit}/>
            {this.successConnect()}
          </div>

         )
       }
     }

     export default Login;
     