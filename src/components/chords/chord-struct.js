import chordDiagram from '../../assets/chords/chord_horizontal.png';
import firstFinger from '../../assets/chords/1-finger.png';
import secondFinger from '../../assets/chords/2-finger.png';
import thirdFinger from '../../assets/chords/3-finger.png';
import fourthFinger from '../../assets/chords/4-finger.png';
import thumb from '../../assets/chords/thumb.png';
import muted from '../../assets/chords/muted.png';
import barre2 from '../../assets/chords/2-string-barre.png';
import barre3 from '../../assets/chords/3-string-barre.png';
import barre4 from '../../assets/chords/4-string-barre.png';
import barre5 from '../../assets/chords/5-string-barre.png';
import barre6 from '../../assets/chords/6-string-barre.png';
import string1 from '../../assets/chords/string1.png';
import string2 from '../../assets/chords/string2.png';
import string3 from '../../assets/chords/string3.png';
import string4 from '../../assets/chords/string4.png';
import string5 from '../../assets/chords/string5.png';
import string6 from '../../assets/chords/string6.png';
import string1Muted from '../../assets/chords/string1-muted.png';
import string2Muted from '../../assets/chords/string2-muted.png';
import string3Muted from '../../assets/chords/string3-muted.png';
import string4Muted from '../../assets/chords/string4-muted.png';
import string5Muted from '../../assets/chords/string5-muted.png';
import string6Muted from '../../assets/chords/string6-muted.png';
import fretMarker from '../../assets/chords/fret-marker.png';

export default class ChordStruct{
    name = null;
    notes = [];
    degrees = [];
    notePositions = [];

    chordImageMap = {
        chordDiagram,
        firstFinger,
        secondFinger,
        thirdFinger,
        fourthFinger,
        thumb,
        muted,
        barre2,
        barre3,
        barre4,
        barre5,
        barre6,
        string1,
        string2,
        string3,
        string4,
        string5,
        string6,
        string1Muted,
        string2Muted,
        string3Muted,
        string4Muted,
        string5Muted,
        string6Muted,
        fretMarker
    };

    constructor(options){
        if(options){
            this.name = options.name ? options.name : null;
            this.notes = options.notes ? options.notes : null;
            this.degrees = options.degrees ? options.degrees : null;
            this.notePositions = options.notePositions ? options.notePositions : null;
        }
    }

    testChord = {
        "name":"C Major",
        "notes":["c","e","g"],
        "degrees":[1,3,5],
        "notePositions":[
            {
                "image":"",
                "finger":0,
                "fret":0,
                "strings":[1],
                "note":"e",
                "degree":3
            },
            {
                "image":"firstFinger",
                "finger":1,
                "fret":1,
                "strings":[2],
                "note":"c",
                "degree":1
            },
            {
                "image":"",
                "finger":0,
                "fret":0,
                "strings":[3],
                "note":"g",
                "degree":5
            },
            {
                "image":"secondFinger",
                "finger":2,
                "fret":2,
                "strings":[4],
                "note":"e",
                "degree":3
            },
            {
                "image":"thirdFinger",
                "finger":3,
                "fret":3,
                "strings":[5],
                "note":"c",
                "degree":1
            },
            {
                "image":"",
                "finger":0,
                "fret":0,
                "strings":[6],
                "note":"e",
                "degree":0
            }  
        ]
    };

}

