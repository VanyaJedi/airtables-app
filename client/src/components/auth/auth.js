import React from 'react';
import './auth.scss';

const Auth = ({googleAuth}) => {
    return (
        <section className="auth">
            <div className="auth__wrapper wrapper">
                <h1>
                    Welcome to latoken tasks list manage app, login with you latoken email to continue
                </h1>
                <form action="/auth/google"> 
                    <button className="btn btn--auth">sign in with google</button>
                </form>    
            </div>
            
        </section>
    );
  };

export default Auth;
