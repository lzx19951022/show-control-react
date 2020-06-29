import React,{useEffect, useState} from 'react'

export default function Topic(topicId) {

 const[topic, settopic] = React.useState();
 
 function set(){
   settopic('[1,2,3]')
 }

 if (topicId === 1) {
   return <div>
           {topic}
          </div>
 } else {
   return <h1>456</h1>
 }

}