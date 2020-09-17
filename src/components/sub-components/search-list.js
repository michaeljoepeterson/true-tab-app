import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './styles/search-list.css';

export default class SearchList extends React.Component{
    constructor(props) {
        super(props);
        //potentially move to update lifecycle method
        this.state = {
            focused:false,
            inputVal:""
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
        if(this.state.focused){
            const key = event.key.toLowerCase();
            console.log('keypress ',key,this.props.label);
            const keyUp = 'arrowup';
            const keyDown = 'arrowdown';
            const enter = 'enter';
            const escape = 'escape';
            switch(key){
                case keyUp:
                    this.handleKeyUp();
                    break;
                case keyDown:
                    this.handleKeyDown();
                    break;
                case enter:
                    this.handleEnter();
                    break;
                case escape:
                    this.inputBlurred();
                    break;
                default:
                    break;
            }
        }
    }

    handleKeyUp = () => {

    }

    handleKeyDown = () =>{

    }

    handleEnter = () =>{

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

    filterItems = (items) =>{
        let val = this.state.inputVal.toLowerCase();
        let newItems = items.filter(item => {
            if(item.value.toLowerCase().includes(val) || !val || val === ''){
                return true;
            }
            else{
                return false;
            }
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

        this.props.itemSelected(this.state.inputVal);
    }

    inputChanged = (event) => {
        event.persist();
        let val = event.target.value;
        this.setState({
            inputVal:val
        });
    }

    render = () =>{
        const items = this.props.items ? this.normalizeItems(this.props.items) : [];
        const filteredItems = this.filterItems(items);
        const label = this.props.label ? (<label className="search-label">{this.props.label}</label>) : null;
        const results = this.props.items ? this.buildResults(filteredItems) : null;
        const searchListClasses = !this.state.focused ? 'search-list-content hide-search' : 'search-list-content';
        const iconClasses = !this.state.focused ? 'search-icon' : 'search-icon opened-icon';
        return(
            <div className="search-list-container">
                {label}
                <div className="search-controls">
                    <input onBlur={(e) => this.inputBlurred(e)} onFocus={(e) => this.inputFocused(e)} className="search-list-input" type="text" value={this.state.inputVal} onChange={(e) => this.inputChanged(e)}/>
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