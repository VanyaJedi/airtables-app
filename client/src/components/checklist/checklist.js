import React from 'react';
import './checklist.scss';
import {checkListLinks} from "../../constants";

const CheckList = () => {


    return (
        <ul className="checklist">
            <li className="checklist__item">
                <span>
                    <b>Unit</b>
                </span>
                <span>
                    <b>Role</b>
                </span>
                <span>
                    <b>Link</b>
                </span>
            </li>
            {checkListLinks.map((link)=>{
               return( <li key={link.id} className="checklist__item">
                    <span>
                        {link.unit}
                    </span>
                    <span>
                        {link.role}
                    </span>
                    <span>
                        <a href={link.shortLink}>{link.shortLink}</a>
                    </span>
                </li>)
            })}
        </ul>
    );
  };

export default CheckList;
