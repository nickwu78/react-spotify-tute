import React, { Component } from 'react';
import styles from './app.css';
import SearchBar from './SearchBar/SearchBar';
import searchSpotify from '../utils/searchSpotify';
import SongItem from './SongItem/SongItem';
import SongList from './SongList/SongList';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialMessage: 'greeting',
      song: '',
      tracks: {},
      songPosition: 0,
    };
  }

  fetchSongs = () => {
    searchSpotify(this.state.song)
      .then(({ tracks }) => this.setState({ tracks }));
  }

  render() {
    const { tracks, songPosition } = this.state;
    console.log('tracks', tracks.tracks);
    return (
      <div className={styles.root}>
        <SearchBar updateText={(song) => this.setState({ song })} fetchSongs={this.fetchSongs} />
        {tracks.tracks && <SongItem songData={tracks.tracks.items[songPosition]} />}
        {tracks.tracks && <SongList listOfSongs={tracks.tracks.items} selectSong={(songPosition) => this.setState({ songPosition })} />}
      </div>
    );
  }
}
