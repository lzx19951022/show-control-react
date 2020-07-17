import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sign from '../Login/logintest';
import Set  from '../Set/Dashboard';
import {Topic1} from '../show/topicFirst.js'
import {Topic2} from '../show/topicSecond.js'


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Sign}></Route>
      <Route exact path='/control-center' component={Set}></Route>
      <Route exact path='/control-center/show/topic1' component={Topic1}></Route>
      <Route exact path='/control-center/show/topic2' component={Topic2}></Route>
    </Switch>
  );
}

export default Main;