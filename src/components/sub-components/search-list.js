import React from 'react';
import './styles/search-list.css';

export default class SearchList extends React.Component{
    constructor(props) {
        super(props);
        //potentially move to update lifecycle method
        this.state = {
            items:props.items ? [...props.items] : []
        };
      }

    initKeyboardListeners = () => {
        document.addEventListener('keydown',this.handleKeyDown);
    }

    removeKeyboardListeners = () => {
        document.removeEventListener('keydown',this.handleKeyDown);
    }

    componentDidMount = () =>{
        this.initKeyboardListeners();
    }
   
   
    componentWillUnmount = () => {
        this.removeKeyboardListeners();
    }

    handleKeyDown = (event) =>{
        const key = event.key.toLowerCase();
        console.log('keypress ',key,this.props.label);
    }

    render = () =>{
        const label = this.props.label ? (<label>{this.props.label}</label>) : null;
        return(
            <div className="search-list-container">
                {label}
                <p>search list</p>
            </div>
        );
    }
}