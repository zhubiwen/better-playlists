import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultTextColor = '#fff'
let defaultStyle = {
  color: defaultTextColor
}

// let fakeServerData = {
//   user:{
//     name:"daviaad",
//     playList: [
//       {
//        name: "My Faviourates",
//        songs:[{name:'Beat it',duration:12134},{name:'Hello World',duration:312},{name:'Awesome Me',duration:1342}]
//       },
//       {
//         name: "My Hi",
//         songs:[{name:'Helllow',duration:41},{name:'Gee',duration:89}]
//       },
//       {
//         name: "Weekly Design",
//         songs:[{name:'Animal Kindom', duration:891},{name:'K',duration:90}]
//       },
//       {
//         name: "Yearly Awesomeness",
//         songs:[{name:'Mrs Errl',duration:781},{name:'Hello World',duration:12},{name:'Awesome Me',duration:11}]
//       },
//     ]
//   }
//
// }

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
        <input onChange={event=> this.props.onTextChnage(event.target.value)} type = 'text'/>
        Filter
      </div>
    )
  }
}

class PlayList extends Component {
  render() {
    return (
      <div style ={{...defaultStyle, display:'inline-block', width:"25%"}}>
        <img src={this.props.playList.imageUrl} style={{width:'150px'}}/>
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
      serverData:{},
      filterString: ""
    }
  }

  componentDidMount(){

    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    fetch ('https://api.spotify.com/v1/me', {
        headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response=> response.json())
    .then(data =>this.setState(

      {
        serverData:
          {user: {name:data.display_name}}
      }

      ));

    fetch ('https://api.spotify.com/v1/browse/featured-playlists', {
        headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response=> response.json())
    .then(data => this.setState({
      playList:data.playlists.items.map(item => {
        console.log(data.playlists.items)
        return {
          name:item.name,
          songs:[],
          imageUrl:item.images[0].url
        }
      }
    )
    }))


    // setTimeout(()=>{
    //   this.setState ({
    //     serverData:fakeServerData,
    //     filterString:" "
    //   })
    // }, 1000);

   }

render(){

let playListToRender = this.state.serverData.user &&
this.state.playList
            ?
this.state.playList.filter(playList =>
  playList.name.toLowerCase().includes(
    this.state.filterString.toLowerCase()))

    : []

  return(
    <div className="App">
      {this.state.serverData.user ?
        <div>
          <h1>{this.state.serverData.user.name} PlayList</h1>

          <PlayListCounter playList = {playListToRender}/>
          <HoursCounter playList = {playListToRender}/>
          <Filter onTextChnage={text=>this.setState({filterString:text})}/>

          {playListToRender.map(playList =>
              <PlayList playList={playList}/>
          )}

        </div> : <button onClick={()=>window.location='http://localhost:8888/login'}
        style={{padding :'20px','fontSize':'50px', 'marginTop':'20px'}}> Sign in with Spotify</button>
      }
    </div>
  )
}


}

export default App;
