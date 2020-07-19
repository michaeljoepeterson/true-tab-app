import React from 'react';
import ChordStruct from './chord-struct';
import './styles/chord.css'

export class Chord extends React.Component {
  constructor(props) {
    super(props);
    //potentially move to update lifecycle method
    let chord = props.chord ? new ChordStruct(props.chord) : new ChordStruct();
    this.state = {
        chord,
        frets:4,
        strings:6,
        stringNames:['e','B','G','D','A','E']
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

  buildFrets = (fretNum,stringNum) => {
    let strings = [];
    for(let i = 0;i < stringNum;i++){
      let frets = [];
      for(let k = 0;k < fretNum;k++){
        let fret = 
        (<div className={'fret fret-r fret-r-' + k} key={k}>
           {this.state.stringNames[i]} fret {k}
        </div>);
        frets.push(fret);
      }

      let string = 
        (<div className="string-r" key={i}>
          {frets}
        </div>);
        strings.push(string);
    }
    return strings;
  }

  render(){
    const frets = this.buildFrets(this.state.frets,this.state.strings);
    console.log(this.state.chord);
    return (
        <div className="chord fretMarker" style={{backgroundImage:`url(${this.state.chord.chordImageMap.fretMarker})`}}>
            {frets}
        </div>
    );
  }
  
}

export default Chord;