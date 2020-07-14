import React from 'react';
import './page-header.scss';
import {tabs} from "../../constants";

const PageHeader = ({activeTab, switchActiveTab}) => {


    return (
        <header className="page-header"> 
            <div className="page-header__wrapper wrapper">
                <img className="page-header__logo" src="./img/latoken.svg" alt="logo"/>
                <ul className="page-header__tabs">
                    {tabs.map((currentTab) => {
                        return (
                            <li 
                                key={currentTab.id}  
                                data-tab={currentTab.tab.toLowerCase()} 
                                className={`page-header__tab ${activeTab===currentTab.tab.toLowerCase() ? 'page-header__tab--active' : ''}`}
                                onClick={(evt) => {
                                    switchActiveTab(evt.target.dataset.tab);
                                }}
                            >
                                {currentTab.tab}
                            </li>
                            );
                    })}
                </ul>
            </div>
        </header>
    );
  };

export default PageHeader;
