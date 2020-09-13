import React from 'react';
import './styles/search-list.css';

export default function SearchList(props){
    const items = props.items;

    const label = props.label ? (<label>{props.label}</label>) : null;
    return(
        <div className="search-list-container">
            {label}
            <p>search list</p>
        </div>
    );
}