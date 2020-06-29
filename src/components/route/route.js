import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sign from '../Login/logintest';
import Set  from '../Set/Dashboard';
import show from '../show/show.js'


const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Sign}></Route>
      <Route exact path='/control-center' component={Set}></Route>
      <Route exact path='/control-center/show' component={show}></Route>
    </Switch>
  );
}

export default Main;