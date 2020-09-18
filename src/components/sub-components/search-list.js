import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import './styles/search-list.css';

export default class SearchList extends React.Component{
    constructor(props) {
        super(props);
        this.currentItems = [];
        this.state = {
            focused:false,
            inputVal:"",
            highlightedIndex:null
        };
      }

    initKeyboardListeners = () => {
        document.addEventListener('keydown',this.controlDropdown);
    }

    removeKeyboardListeners = () => {
        document.removeEventListener('keydown',this.controlDropdown);
    }

    componentDidMount = () =>{
        this.initKeyboardListeners();
    }
   
    componentWillUnmount = () => {
        this.removeKeyboardListeners();
    }

    controlDropdown = (event) =>{
        const key = event.key.toLowerCase();
        if(this.state.focused){
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
        let maxIndex = this.currentItems.length - 1;
        if(this.state.highlightedIndex === null){
            this.setState({
                highlightedIndex:maxIndex
            });
            return;
        }
        let currentIndex =  this.state.highlightedIndex;

        currentIndex = currentIndex - 1;
        if(currentIndex < 0){
            this.setState({
                highlightedIndex:maxIndex
            });
        }
        else{
            this.setState({
                highlightedIndex:currentIndex
            });
        }
    }

    handleKeyDown = () =>{
        let maxIndex = this.currentItems.length - 1;
        if(this.state.highlightedIndex === null){
            this.setState({
                highlightedIndex:0
            });
            return;
        }

        let currentIndex =  this.state.highlightedIndex;

        currentIndex = currentIndex + 1;

        if(currentIndex > maxIndex){
            this.setState({
                highlightedIndex:0
            });
        }
        else{
            this.setState({
                highlightedIndex:currentIndex
            });
        }
    }

    handleEnter = () =>{
        if(this.state.highlightedIndex || this.state.highlightedIndex === 0){
            let val = this.currentItems[this.state.highlightedIndex].value;
            this.setInputVal(val,true);
        }
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
        this.currentItems = newItems;
        return newItems;
    }

    buildResults = (items) => {
        let results = items.map((item,i) => {
            const classes = i === this.state.highlightedIndex ? 'search-item highlighted' : 'search-item';
            const result = (
                <li onClick={(e) => {this.setInputVal(item.value,true)}} className={classes} key={item.value + i}>{item.value}</li>
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

        this.props.itemSelected(this.state.inputVal,this.props.callbackTarget);
    }

    inputChanged = (event) => {
        event.persist();
        let val = event.target.value;
        this.setInputVal(val);
    }

    setInputVal = (val,updateParent) => {
        this.setState({
            inputVal:val
        });

        if(updateParent){
            this.props.itemSelected(val,this.props.callbackTarget);
        }
    }

    buildPlaceholderText = () => {
        if(this.currentItems.length > 0){
            return 'Eg. ' + this.currentItems[0].value;
        }
        else{
            return '';
        }
    }

    render = () =>{
        const items = this.props.items ? this.normalizeItems(this.props.items) : [];
        const filteredItems = this.filterItems(items);
        const label = this.props.label ? (<label className="search-label">{this.props.label}</label>) : null;
        const results = this.props.items ? this.buildResults(filteredItems) : null;
        const searchListClasses = !this.state.focused ? 'search-list-content hide-search' : 'search-list-content';
        const iconClasses = !this.state.focused ? 'search-icon' : 'search-icon opened-icon';
        const placeholderText = this.props.placeholder ? this.props.placeholder : this.buildPlaceholderText();
        const inputClasses = this.state.focused ? 'search-list-input highlighted' :'search-list-input'

        return(
            <div className="search-list-container">
                {label}
                <div className="search-controls">
                    <input onBlur={(e) => this.inputBlurred(e)} onFocus={(e) => this.inputFocused(e)} className={inputClasses} type="text" value={this.state.inputVal} onChange={(e) => this.inputChanged(e)} placeholder={placeholderText}/>
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