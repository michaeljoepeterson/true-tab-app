import React from 'react';
import ChordStruct from './chord-struct';

export class Chord extends React.Component {
  constructor(props) {
    super(props);
    //potentially move to update lifecycle method
    let chord = props.chord ? new ChordStruct(props.chord) : new ChordStruct();
    this.state = {
        chord
    };
  }
  render(){
    console.log(this.state.chord)
    return (
        <div className="chord">
            <p>chord</p>
            <img src={this.state.chord.chordImageMap.chordDiagram} alt="chord diagram"/>
        </div>
    );
  }
  
}

export default Chord;