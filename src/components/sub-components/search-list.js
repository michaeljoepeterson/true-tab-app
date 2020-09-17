import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './styles/search-list.css';

export default class SearchList extends React.Component{
    constructor(props) {
        super(props);
        //potentially move to update lifecycle method
        this.state = {
            focused:false

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
    //convert items into data for searchlist by target - will be name of chord or any item
    normalizeItems = (items) => {
        let newItems = items.map(item => {
            let newItem = {
                highlighted:false,
                value:item[this.props.target]
            };
            
            return newItem;
        });
        
        return newItems;
    }

    buildResults = (items) => {
        let results = items.map(item => {
            const classes = item.highlighted ? 'search-item highlighted' : 'search-item';
            const result = (
                <li className={classes} key={item.value}>{item.value}</li>
            );

            return result;
        });
    

        return results;
    }

    inputFocused = () =>{
        this.setState({
            focused:true
        });
    }

    inputBlurred = () =>{
        this.setState({
            focused:false
        });
    }

    render = () =>{
        const items = this.props.items ? this.normalizeItems(this.props.items) : [];
        const label = this.props.label ? (<label className="search-label">{this.props.label}</label>) : null;
        const results = this.props.items ? this.buildResults(items) : null;
        const searchListClasses = !this.state.focused ? 'search-list-content hide-search' : 'search-list-content';
        const iconClasses = !this.state.focused ? 'search-icon' : 'search-icon opened-icon';
        return(
            <div className="search-list-container">
                {label}
                <div className="search-controls">
                    <input onBlur={(e) => this.inputBlurred(e)} onFocus={(e) => this.inputFocused(e)} className="search-list-input" type="text"/>
                    <KeyboardArrowDownIcon className={iconClasses}/>
                    <div className={searchListClasses}>
                        <ul className="search-results">
                            {results}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}