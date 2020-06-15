import React from 'react';



class Set extends React.Component {
  testAPi() {
    fetch('http://192.168.10.227:3000/api/atem/test', {
      method: 'get'
    }).then(response => {
      if (response.ok) {
       return response.text()
      }
    })
  }
  testAPi2() {
    fetch('http://192.168.10.227:3000/api/atem/test2', {
      method: 'get'
    }).then(response => {
      if (response.ok) {
       return response.text()
      }
    })
  }
  testAPi3() {
    fetch('http://192.168.10.227:3000/api/atem/test3', {
      method: 'get'
    }).then(response => {
      if (response.ok) {
       return response.text()
      }
    })
  }
  render(){
    return(
      <div>
      <button onClick={this.testAPi}>
       1
      </button>
      <button onClick={this.testAPi2}>
       12
      </button>
      <button onClick={this.testAPi3}>
       123
      </button>
      <div>
      </div>
      </div>
    )
  }
}

export default Set;