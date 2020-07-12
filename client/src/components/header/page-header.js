import React from 'react';
import './page-header.scss';

const PageHeader = () => {
    return (
        <header className="page-header"> 
            <div className="page-header__wrapper wrapper">
                <img className="page-header__logo" src="./img/latoken.svg" alt="logo"/>
                <h1>Employee task list</h1>
            </div>
        </header>
    );
  };

export default PageHeader;
