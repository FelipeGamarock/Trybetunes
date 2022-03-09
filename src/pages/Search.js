import React from 'react';
import Header from '../componentes/Header';

const MIN_ARTIST_LENGTH = 2;
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isButtonDisable: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (value.length >= MIN_ARTIST_LENGTH) {
      this.setState({ isButtonDisable: false });
    } else {
      this.setState({ isButtonDisable: true });
    }
  }

  render() {
    const { searchInput, isButtonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchInput"
            id="searchInput"
            onChange={ this.onInputChange }
            value={ searchInput }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisable }
          >
            Procurar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
