export default class NoteChecker{
    notes = ['A','A#/Bb','B','C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab'];

    constructor(){

    }

    checkNote(string,fret){
        string = string.toUpperCase();
        let stringIndex = this.notes.findIndex(note => note === string) + Number(fret);
        let endOffset = this.notes.length - 1 - stringIndex;
        //debugger;
        if(endOffset >= 0){
            return this.notes[stringIndex];
        }
        else{
            let adjustedIndex = stringIndex - this.notes.length;
            return this.notes[adjustedIndex];
        }
    }
}