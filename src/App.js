import React, { Component } from 'react';
import './App.css';

let defaultTextColor = '#fff'
let defaultStyle = {
  color: defaultTextColor
}

let fakeServerData = {
  user:{
    name:"daviaad",
    playList: [
      {
       name: "My Faviourates",
       songs:[{name:'Beat it',duration:12134},{name:'Hello World',duration:312},{name:'Awesome Me',duration:1342}]
      },
      {
        name: "My Hi",
        songs:[{name:'Helllow',duration:41},{name:'Gee',duration:89}]
      },
      {
        name: "Weekly Design",
        songs:[{name:'Animal Kindom', duration:891},{name:'K',duration:90}]
      },
      {
        name: "Yearly Awesomeness",
        songs:[{name:'Mrs Errl',duration:781},{name:'Hello World',duration:12},{name:'Awesome Me',duration:11}]
      },
    ]
  }

}

class PlayListCounter extends Component {
  render(){
    return(
      <div style = {{...defaultStyle, width:"40%", display: "inline-block"}}>
        <h2 > {this.props.playList.length} PlayLists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render(){
    let allSongs = this.props.playList.reduce((songs,eachPlaylist)=> {
      return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong)=>{
      return sum + eachSong.duration
    },0)
    return(
      <div style = {{...defaultStyle, width:"40%", display: "inline-block"}}>
        <h2 > {Math.round(totalDuration/60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component{
  render(){
    return (
      <div style ={defaultStyle}>
        <img/>
        <input type = 'text'/>
        Filter
      </div>
    )
  }
}

class PlayList extends Component {
  render() {
    return (
      <div style ={{...defaultStyle, display:'inline-block', width:"25%"}}>
        <img />
        <h3>{this.props.playList.name}</h3>
        <ul>
          {
            this.props.playList.songs.map(song =><li>{song.name}</li>)
          }
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      serverData:{}
    }
  }

  componentDidMount(){

    setTimeout(()=>{
      this.setState ({
        serverData:fakeServerData
      })
    }, 1000)
   }

render(){
  return(
    <div className="App">
      {this.state.serverData.user ?
        <div>
          <h1>{this.state.serverData.user.name} PlayList</h1>
          <PlayListCounter playList = {this.state.serverData.user.playList}/>
          <HoursCounter playList = {this.state.serverData.user.playList}/>
          <Filter/>
          {
            this.state.serverData.user.playList.map(playList =>
              <PlayList playList={playList}/>
            )
          }
        </div> : <h1 >loading...</h1>
      }
    </div>
  )
}


}

export default App;
