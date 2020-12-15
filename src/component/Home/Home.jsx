import React, {Component, Fragment} from 'react';
import Login from '../Login/Login';
import './Home.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import App from '../../App';

export class Home extends Component {
    render (){
        return(
            <BrowserRouter>
                <Fragment>
                    <div className="header">
                        <Link to='/'>Kepegawaian</Link>
                        <Link to='/login'>Login</Link>
                    </div>

                    {/* <div className="container">
                        <Login />
                    </div> */}
                    <Route path='/' exact component={App}/>
                    <Route path='/login' component={Login}/>
                </Fragment>
            </BrowserRouter>
        )
    }

}

export default Home
