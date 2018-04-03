import React, { Component } from 'react';

import './App.css';

let defaultTextColor = "#fff";
let defaultStyle = {
  color: defaultTextColor
};

let fakeServerData = {
  user: {
    name: 'Oswaldo',
    playlists: [
      {
        name: 'My favorites',
        songs: [{name:'Beat It', duration:1236},
                {name:'Cannelloni Makaroni', duration:7000},
                {name:'Rosa helikopter', duration:1236}]
      },
      {
        name: 'Discover Weekly',
        songs: [{name:'Beat It', duration:1236}, {name:'Cannelloni Makaroni', duration:7000},{name:'Rosa helikopter', duration:1236}]
      },
      {
        name: 'On the Road',
        songs: [{name:'Beat It', duration:1236}, {name:'Cannelloni Makaroni', duration:7000},{name:'Rosa helikopter', duration:1236}]
      },
      {
        name: 'Yeah!!!',
        songs: [{name:'Beat It', duration:1236}, {name:'Cannelloni Makaroni', duration:7000},{name:'Rosa helikopter', duration:1236}]
      }


    ]
  }
};

class PlaylistCounter extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render () {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum = eachSong.duration;
    }, 0);
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render () {
    return (
      <div style={defaultStyle}>
        <img alt=""/>
        <input type="text" onKeyUp={(event) => {this.props.onTextChange(event.target.value)}}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render () {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img alt=""/>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map(song =>
            <li key={song.name}>{song.name}</li>
          )}

        </ul>

      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString:''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
    
  }
  render() {
    return (
      <div className="App">




        {this.state.serverData.user ?
          <div>
          <h1 style={{...defaultStyle, "fontSize": "54px"}}>{
            this.state.serverData.user.name}s Playlist</h1>
            <PlaylistCounter playlists={this.state.serverData.user &&
              this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user &&
                this.state.serverData.user.playlists} />
            <Filter onTextChange={text => this.setState({filterString: text})} />

            {
              this.state.serverData.user.playlists.filter(playlist =>
                playlist.name.toLowerCase().includes(
                  this.state.filterString.toLowerCase())
              ).map((playlist) => {
                return <Playlist playlist={playlist} />
                }
              )
            }

          </div> : <h1>Loading...</h1>
        }


      </div>
    );
  }
}


export default App;
