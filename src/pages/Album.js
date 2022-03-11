import React from 'react';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
      </div>
    );
  }
}

export default Album;
