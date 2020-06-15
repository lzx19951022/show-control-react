import React,{useState, useEffect,useCallback} from 'react';
export default class func {
    constructor(){
    }

   //链接cg
   connect(cgip, cgport) {
     const cgData= {ip: cgip, port: cgport}
     fetch(`http://192.168.10.227:3000/api/cg/connect`, {
       method: 'post',
       headers: {
         'Content-type': 'application/json'
       },
       body: JSON.stringify(cgData)
     }).then(response => {
      if (response.ok) {
      return response.text()
      }
      }).then(response => {
        return response
      })

   }

}
