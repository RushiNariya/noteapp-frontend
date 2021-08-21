import { Container } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AddNote from './components/AddNote/AddNote';
import NoteList from './components/Note/NoteList/NoteList';
import EditNote from './components/EditNote/EditNote';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Navigation from './components/Navigation/Navigation';
import Registration from './components/Registration/Registration';
import './App.css';
import Error from './components/Error/Error';
import MyProfile from './components/MyProfile/MyProfile';

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: '10px',
            background: '#fff',
            padding: '1rem',
            color: '#000',
          },
        }}
      />
      <Navigation />
      <div className="main-container">
        <Container>
          <div>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/addnote" exact component={AddNote} />
              <Route path="/addUser" exact component={Registration} />
              <Route path="/note/:id/edit" exact component={EditNote} />
              <Route path="/notes" exact component={NoteList} />
              <Route path="/myprofile/:id" exact component={MyProfile} />
              <Route>
                <Error
                  error="404 Page not found"
                  message="we can not seem to find the page you are looking for."
                />
              </Route>
            </Switch>
          </div>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
