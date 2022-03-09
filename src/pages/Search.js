import React from 'react';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MIN_ARTIST_LENGTH = 2;
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isButtonDisable: true,
      isLoading: false,
      artistName: '',
      albuns: [],
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

  handleClick = async () => {
    this.setState({ isLoading: true });
    const { searchInput } = this.state;
    const data = await searchAlbumsAPI(searchInput);
    this.setState({
      artistName: searchInput,
      searchInput: '',
      albuns: data,
      isLoading: false,
    });
  }

  render() {
    const { searchInput, isButtonDisable, isLoading, albuns, artistName } = this.state;
    if (isLoading) return <Loading />
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
            onClick={ this.handleClick }
          >
            Procurar
          </button>
        </form>

        { albuns.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : (
            <div>
              <p>
                Resultado de álbuns de:
                {` ${artistName}`}
              </p>
              <div>
                Album
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
