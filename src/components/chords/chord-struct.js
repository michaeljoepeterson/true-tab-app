import chordDiagram from '../../assets/chords/chord_horizontal.png'

export default class ChordStruct{
    name = null;
    notes = [];
    degrees = [];
    notePositions = [];

    chordImageMap = {
        chordDiagram
    };

    constructor(options){
        if(options){
            this.name = options.name ? options.name : null;
            this.notes = options.notes ? options.notes : null;
            this.degrees = options.degrees ? options.degrees : null;
            this.notePositions = options.notePositions ? options.notePositions : null;
        }
    }

}

