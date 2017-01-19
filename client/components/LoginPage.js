import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import { toJS } from 'mobx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


export default class LoginPage extends React.Component {
  render() {
    return (
      <div className='loginContainer'>
        <h5>Welcome to callback.io, your personal recruiter!</h5>
        <div className='loginBanner'>
          <div>
            <img className='loginIcon' src='http://www.socialagent.me/wp-content/uploads/2014/04/job-icon.png'></img>
            <div className='loginText'>Search for jobs</div>
          </div>
          <div>
            <img className='loginIcon' src='https://cdn2.iconfinder.com/data/icons/digital-marketing-7/64/39_personalization-512.png'></img>
            <div className='loginText'>Track your application</div>
          </div>
          <div>
            <img className='loginIcon' src='https://cdn2.iconfinder.com/data/icons/classic-development-circle/512/full_signal-512.png'></img>
            <div className='loginText'>Analyze your tactics</div>
          </div>
          <div>
            <img className='loginIcon' src='https://cdn3.iconfinder.com/data/icons/medical-2-1/512/community-512.png'></img>
            <div className='loginText'>Manage your connections</div>
          </div>
        </div>
        <div className='loginLink'>
          <div><a href='/auth/google'>Login with Google to start your search! ></a></div>
        </div>
      </div>
    );
  }
}