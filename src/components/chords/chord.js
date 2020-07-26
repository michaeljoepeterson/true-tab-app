import React from 'react';
import ChordStruct from './chord-struct';
import NoteChecker from '../note-checker';
import './styles/chord.css'

export class Chord extends React.Component {
  constructor(props) {
    super(props);
    //potentially move to update lifecycle method
    let chord = props.chord ? new ChordStruct(props.chord) : new ChordStruct();
    let fret = props.fret ? props.fret : 4;
    this.stringNames = ['e','B','G','D','A','E'];
    this.noteChecker = new NoteChecker();
    this.state = {
        chord,
        frets: fret,
        strings:6,
        selectedNote:null  
    };
  }
  
  componentDidMount = () => {
    const testChord = 'C Major';
    if(this.props.chord || testChord){
        this.getChord();
    }
      
  }

  getChord = (chordName) => {
    let testChord = new ChordStruct(this.state.chord.testChord);
    this.setState({
        chord:testChord
    });
  }

  fretClicked = (event) => {
    event.persist();
    event.stopPropagation();
    console.log(event);
    let fret = event.target.dataset.fret;
    let stringIndex = event.target.dataset.string;
    let string = this.stringNames[stringIndex];
    let note = this.noteChecker.checkNote(string,fret);
    console.log(note);
    this.setState({
      selectedNote:note
    });
    if(this.props.fretClickHandler){
      this.props.fretClickHandler(note);
    }
  }

  buildFrets = (fretNum,stringNum) => {
    let strings = [];
    for(let i = 0;i < stringNum;i++){
      let frets = [];
      for(let k = 0;k < fretNum;k++){
        let fret = 
        (<div className={'fret-r fret-r-' + k} key={k} data-string={i} data-fret={k + 1} onClick={(e) => this.fretClicked(e)}>
            <img className="string-img" src={this.state.chord.chordImageMap['string' + (i + 1)]} alt={"string " + i + " fret " + k} data-string={i} data-fret={k+1}></img>
            <img className="finger-img" src={this.state.chord.chordImageMap.firstFinger} alt='finger'/>
        </div>);
        frets.push(fret);
      }

      let string = 
        (<div className={i === stringNum - 1 ? 'string-r last-string' :'string-r' } key={i}>
          {frets}
        </div>);
        strings.push(string);
    }
    return strings;
  }

  render(){
    const frets = this.buildFrets(this.state.frets,this.state.strings);
    let note = this.state.selectedNote ? (
      <div style={{textAlign:'center',width:'100%'}}>
        <p>The note is {this.state.selectedNote}</p>
      </div>) : null;
    return (
        <div className="chord fretMarker" style={{backgroundImage:`url(${this.state.chord.chordImageMap.fretMarker})`}}>
            {frets}
            {note}
        </div>
    );
  }
  
}

export default Chord;