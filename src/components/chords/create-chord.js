import React from 'react';
import {withRouter,Link} from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import {connect} from 'react-redux';
import requiresLogin from '../../HOC/requires-login';
import Chord from './chord';
import Grid from '@material-ui/core/Grid';
import SearchList from '../sub-components/search-list';
import {getChords} from '../../actions/chord-actions';

export class CreateChord extends React.Component {
  constructor(props) {
    super(props);
    this.chordTarget = 'name';
    this.defaultChordData = [
      {
        frets:4
      },
      {
        frets:5
      }
    ];
    this.testChordC = {
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

    this.testChordFullF = {
      "name":"F Major",
      "notes":["f","a","c"],
      "degrees":[1,3,5],
      "notePositions":[
          {
              "image":"firstFinger",
              "finger":1,
              "fret":1,
              "strings":[1,2,3,4,5,6],
              "note":"f",
              "degree":1
          },
          {
              "image":"",
              "finger":0,
              "fret":1,
              "strings":[2],
              "note":"c",
              "degree":3
          },
          {
              "image":"secondFinger",
              "finger":2,
              "fret":2,
              "strings":[3],
              "note":"a",
              "degree":3
          },
          {
              "image":"fourthFinger",
              "finger":4,
              "fret":3,
              "strings":[4],
              "note":"f",
              "degree":1
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
              "fret":1,
              "strings":[6],
              "note":"f",
              "degree":1
          }  
      ]
    };

    this.testChordPartialF = {
      "name":"F Major 2f Barre",
      "notes":["f","a","c"],
      "degrees":[1,3,5],
      "notePositions":[
          {
              "image":"firstFinger",
              "finger":1,
              "fret":1,
              "strings":[1,2],
              "note":"f",
              "degree":1
          },
          {
              "image":"",
              "finger":0,
              "fret":1,
              "strings":[2],
              "note":"c",
              "degree":3
          },
          {
              "image":"secondFinger",
              "finger":2,
              "fret":2,
              "strings":[3],
              "note":"a",
              "degree":3
          },
          {
              "image":"fourthFinger",
              "finger":4,
              "fret":3,
              "strings":[4],
              "note":"f",
              "degree":1
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
              "fret":1,
              "strings":[6],
              "note":"f",
              "degree":0
          }  
      ]
    };

    this.testChordPartialF3 = {
      "name":"F Major 3f Barre",
      "notes":["f","a","c"],
      "degrees":[1,3,5],
      "notePositions":[
          {
              "image":"firstFinger",
              "finger":1,
              "fret":1,
              "strings":[1,2,3],
              "note":"f",
              "degree":1
          },
          {
              "image":"",
              "finger":0,
              "fret":1,
              "strings":[2],
              "note":"c",
              "degree":3
          },
          {
              "image":"secondFinger",
              "finger":2,
              "fret":2,
              "strings":[3],
              "note":"a",
              "degree":3
          },
          {
              "image":"fourthFinger",
              "finger":4,
              "fret":3,
              "strings":[4],
              "note":"f",
              "degree":1
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
              "fret":1,
              "strings":[6],
              "note":"f",
              "degree":0
          }  
      ]
    };

    this.state = {
      selectedNote:null,
      chords:null,
      selectedChords:[]
    };
  }

  fretClicked = (note) => {
    this.setState({
      selectedNote:note
    });
  }

  buildChordState = (chordData) =>{
    let selectedChords = chordData.map(data =>{
      if(data.chord){
        return data.chord;
      }
      else{
        return null;
      }
    })
    this.setState({
      selectedChords
    });
  }

  componentDidMount = () => {
    //get chords from server
    this.buildChordState(this.defaultChordData);
    this.getChordsReq();
  }

  getChordsReq = async () => {
    //this.props.dispatch(getChords('Guitar'))
    await getChords('Guitar',this.props.authToken);
    this.setState({
      chords:[this.testChordC,this.testChordFullF,this.testChordPartialF,this.testChordPartialF3]
    });
  }

  chordChanged = (val,index) => {
    console.log(val,index);
    let selectedChord = this.state.chords.find(chord => chord.name === val);
    if(selectedChord){
      let selectedChords = [...this.state.selectedChords];
      selectedChords[index] = selectedChord
      this.setState({
        selectedChords
      });
    }
  }

  buildChords = (chordData) => {
    let chords = chordData.map((data,i) => {
      console.log(this.state.selectedChords[i]);
      return (<Chord chord={this.state.selectedChords[i]} fret={data.frets} fretClickHandler={this.fretClicked}/>);
    });

    return chords;
  }

  buildSearchLists = (chordData) => {
    let searchLists = chordData.map((data,i) => {
      return (
        <SearchList target={this.chordTarget} items={this.state.chords} itemSelected={this.chordChanged} callbackTarget={i}/>
      );
    });

    return searchLists;
  }

  //chord selectors here then feed chord to chord component
  //need to eventually be able to create, delete, and update chords
  render(){
    let note = this.state.selectedNote ? (
    <div style={{textAlign:'center',width:'100%'}}>
      <p>The last selected note is {this.state.selectedNote}</p>
    </div>) : null;
    console.log('create chords state:',this.state);
    let searchList = this.state.chords ? this.buildSearchLists(this.defaultChordData) : [];

    let chords = this.buildChords(this.defaultChordData);
    return (
        <Grid container>
          <Grid item lg={6} xs={12}>
            {searchList[0]}
            {chords[0]}
          </Grid>
          <Grid item lg={6} xs={12}>
            {searchList[1]}
            {chords[1]}
          </Grid>
          {note}
          <Link to="/test">Home</Link>
        </Grid>
    );
  }
  
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  authToken:state.auth.authToken,
  error:state.auth.error,
  testMode:state.auth.testMode
});
export default requiresLogin()(withRouter(connect(mapStateToProps)(CreateChord)));
