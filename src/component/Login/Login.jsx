import  React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import googleLogin from './googleLogin';
// import GoogleLogin from './googleLogin';


export class Login extends Component {
    
    render () {
       const responseGoogle = async(response) => {
           console.log(response.accessToken)
           let googleResponse = await googleLogin(response.accessToken)
           console.log(googleResponse);
           console.log(response);
        //    history.push('/')
       }
        return (
            <div>
                <h1>Login with Google</h1>
                <GoogleLogin
                    clientId="625450354773-v7trkuue04icu9q1h3d07tc6bqr1v0u4.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    // cookiePolicy={'single_host_origin'}
               />
            </div>
        )
    }
}

export default Login