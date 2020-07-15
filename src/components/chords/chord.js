import React from 'react';
import ChordStruct from './chord-struct';
import './styles/chord.css'

export class Chord extends React.Component {
  constructor(props) {
    super(props);
    //potentially move to update lifecycle method
    let chord = props.chord ? new ChordStruct(props.chord) : new ChordStruct();
    this.state = {
        chord
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

  render(){
    
    console.log(this.state.chord);
    return (
        <div className="chord" style={{backgroundImage:`url(${this.state.chord.chordImageMap.chordDiagram})`}}>
            <p>chord</p>
            {/* <img src={this.state.chord.chordImageMap.chordDiagram} alt="chord diagram"/> */}
        </div>
    );
  }
  
}

export default Chord;