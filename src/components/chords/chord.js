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
        (<div className={'fret fret-' + k} key={k}>
            fret {k} string {this.state.stringNames[i]}
        </div>);
        frets.push(fret);
      }

      let string = 
        (<div className="string" key={i}>
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
        <div className="chord" style={{backgroundImage:`url(${this.state.chord.chordImageMap.chordDiagram})`}}>
            <p>chord</p>
            {frets}
        </div>
    );
  }
  
}

export default Chord;