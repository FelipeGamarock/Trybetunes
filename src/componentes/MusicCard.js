import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  handleCheckbox = async ({ target }) => {
    const { trackId } = this.props;
    this.setState({
      isLoading: true,
      isChecked: target.checked,
    });
    const songs = await getMusics(trackId);
    const added = await addSong(songs);
    if (added) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { musicName, preview, trackId } = this.props;
    const { isChecked, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ musicName }>
          Favorita
          <input
            type="checkbox"
            id={ musicName }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleCheckbox }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
export default MusicCard;
