import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../componentes/Loading';
import MusicCard from '../componentes/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      songs: [],
      collectionName: '',
      artistName: '',
      favorites: [],
    };
  }

  async componentDidMount() {
    this.getSongsFromAlbum();
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorites: favoriteSongs,
    });
  }

  getSongsFromAlbum = async () => {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      songs: response,
      isLoading: false,
      collectionName: response[0].collectionName,
      artistName: response[0].artistName,
    });
    console.log(response);
  }

  render() {
    const { isLoading, songs, artistName, collectionName, favorites } = this.state;
    console.log(favorites);
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        <div>
          {songs
            .map((song, index) => {
              if (index !== 0) {
                return (
                  <MusicCard
                    key={ song.trackId }
                    musicName={ song.trackName }
                    preview={ song.previewUrl }
                    trackId={ song.trackId }
                  />);
              }
              return '';
            })}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
