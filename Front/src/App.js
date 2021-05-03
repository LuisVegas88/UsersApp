import React, { useState }from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {UserProvider} from "../../Front/src/Components/Contexts/UserContext"

import './App.css';
import HeaderNav from './Components/Header/HeaderNav';
import UserDetails from './Components/UserDetails/UserDetails';
import UserList from './Components/UserList/UserList';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';
import Register from './Components/Register/Register';


function App() {
  const [userId, setUserId] = useState({});
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path = "/">
              <HeaderNav/>
            <UserProvider value = {{userId, setUserId}}>
              <UserList></UserList>
            </UserProvider>
          </Route>
          
          <Route exact path = "/register">
            <HeaderNav/>
             <UserProvider value = {{userId, setUserId}}>
              <Register/>
            </UserProvider>
          </Route>

          <Route exact path="/userDetail">
            <HeaderNav/>
            <UserProvider value = {{userId, setUserId}}>
              <UserDetails/>
            </UserProvider>
          </Route>

          <Route exact path="/userUpdate">
            <HeaderNav/>
           <UserProvider value = {{userId, setUserId}}>
              <ProfileEdit/>
            </UserProvider>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
