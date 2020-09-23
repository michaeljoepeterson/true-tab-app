import React from 'react';
import ChordStruct from './chord-struct';
import NoteChecker from '../note-checker';
import {sixStringNames} from '../../config';
import './styles/chord.css'

export class Chord extends React.Component {
  constructor(props) {
    super(props);
    //potentially move to update lifecycle method
    let fret = props.fret ? props.fret : 4;
    this.stringNames = sixStringNames;
    this.noteChecker = new NoteChecker();
    this.state = {
        frets: fret,
        strings:6,
        selectedNote:null  
    };
  }
  
  componentDidMount = () => {
    //const testChord = 'C Major';
    /*
    if(!this.chord){
        this.getChord();
    }
    */
  }

  getChord = (chordName) => {
    let testChord = new ChordStruct(this.state.chord.testChord);
    this.setState({
        chord:testChord
    });
  }

  fretClicked = (event) => {
    try{
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
    catch(err){
      console.log('error getting note: ',err);
    }
  }

  buildEmtpyImgArray = (fretNum,stringNum) =>{
    let imgArray = [];

    for(let i = 0;i < stringNum;i++){
      let stringArr = [];
      for(let k = 0;k < fretNum;k++){
        stringArr.push(null);
      }
      imgArray.push(stringArr);
    }

    return imgArray;
  }
  //make dynamic
  getFingerImg = (notePosition,fretNum) =>{
    const fingerMap = {
      1:'firstFinger',
      2:'secondFinger',
      3:'thirdFinger',
      4:'fourthFinger',
      5:'thumb'
    };

    const barreMap = {
      2:'barre2',
      3:'barre3',
      4:'barre4',
      5:'barre5',
      6:'barre6'
    };

    let fretImgs = notePosition.map(note => []);
    for(let i = 0;i < notePosition.length;i++){
      let noteData = notePosition[i];
      for(let k = 0;k < fretNum;k++){
        let fret = k + 1;
        let noteFret = noteData.fret;
        let noteImg = null;
        if(noteData.strings.length === 1){
          noteImg = fingerMap[noteData.finger];
        }
        else if(noteData.strings.length > 1){
          noteImg = barreMap[noteData.strings.length];
        }
        if(fret === noteFret && noteImg !== '' && noteImg){
          fretImgs[i].push(noteImg);
        }
        else{
          fretImgs[i].push(null);
        }
      }
    }

    return fretImgs;
  }

  getStringImg = (notePosition) =>{
    let stringImgs = [];
    if(notePosition && notePosition.length > 0){
      stringImgs = notePosition.map(note => null);
      for(let i = 0;i < notePosition.length;i++){
        let noteData = notePosition[i];
        let stringImg = noteData.degree !== 0 ? 'string' + (i+1) : 'string' + (i+1) + 'Muted' ;
        stringImgs[i] = stringImg;
      }
    }
    else{
      this.stringNames.forEach((string,i) => {
        let stringImg = 'string' + (i+1);
        stringImgs[i] = stringImg;
      });
    }

    return stringImgs;
  }

  buildFrets = (fretNum,stringNum) => {
    let strings = [];
    let stringImgs = this.getStringImg(this.chord.chordNotes);
    let fretImgs = this.getFingerImg(this.chord.chordNotes,fretNum);
    //debugger;
    for(let i = 0;i < stringNum;i++){
      let frets = [];
      let stringImg = stringImgs[i];
      //let stringImg = 'string1'
      for(let k = 0;k < fretNum;k++){
        let fingerImg = fretImgs && fretImgs.length !== 0 ? fretImgs[i][k] : null;
        let fingerElement = null;
        if(fingerImg){
          let fingerClasses = fingerImg.includes('barre') ? 'finger-img barre-img' : 'finger-img';
          fingerElement = (<img className={fingerClasses} src={this.chord.chordImageMap[fingerImg]} alt='finger' data-string={i} data-fret={k+1}/>);
        }
        let fret = 
        (<div className={'fret-r fret-r-' + k} key={k} data-string={i} data-fret={k + 1} onClick={(e) => this.fretClicked(e)}>
            <img className="string-img" src={this.chord.chordImageMap[stringImg]} alt={"string " + i + " fret " + k} data-string={i} data-fret={k+1}/>
            {fingerElement}
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
    this.chord = this.props.chord ? new ChordStruct(this.props.chord) : new ChordStruct();
    let fret = this.props.fret ? this.props.fret : 4;
    const frets = this.buildFrets(fret,this.state.strings);
    let note = this.state.selectedNote ? (
      <div style={{textAlign:'center',width:'100%'}}>
        <p>The note is {this.state.selectedNote}</p>
      </div>) : null;
    return (
        <div className="chord fretMarker" style={{backgroundImage:`url(${this.chord.chordImageMap.fretMarker})`}}>
            {frets}
            {note}
        </div>
    );
  }
  
}

export default Chord;