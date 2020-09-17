import React from 'react';
import {withRouter,Link} from 'react-router-dom';
//import CreateAdmin from './components/auth/create-admin-form';
import {connect} from 'react-redux';
import requiresLogin from '../../HOC/requires-login';
import Chord from './chord';
import Grid from '@material-ui/core/Grid';
import SearchList from '../sub-components/search-list';

export class CreateChord extends React.Component {
  constructor(props) {
    super(props);
    this.chordTarget = 'name';
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
              "degree":0
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
      chords:null
    }
  }

  fretClicked = (note) => {
    this.setState({
      selectedNote:note
    });
  }

  componentDidMount = () => {
    //get chords from server
    this.getChords();
  }

  getChords = () => {
    this.setState({
      chords:[this.testChordC,this.testChordFullF,this.testChordPartialF,this.testChordPartialF3]
    });
  }

  //chord selectors here then feed chord to chord component
  //need to eventually be able to create, delete, and update chords
  render(){
    let note = this.state.selectedNote ? (
    <div style={{textAlign:'center',width:'100%'}}>
      <p>The last selected note is {this.state.selectedNote}</p>
    </div>) : null;
    console.log('create chords state:',this.state);
    return (
        <Grid container>
          <Grid item lg={6} xs={12}>
            <SearchList label={"Chord"} target={this.chordTarget} items={this.state.chords}/>
            <Chord chord={this.testChordC} fretClickHandler={this.fretClicked}/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <SearchList target={this.chordTarget} items={this.state.chords}/>
            <Chord chord={this.testChordPartialF} fret={5} fretClickHandler={this.fretClicked}/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Chord chord={this.testChordFullF} fret={5} fretClickHandler={this.fretClicked}/>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Chord chord={this.testChordPartialF3} fret={5} fretClickHandler={this.fretClicked}/>
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
