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
      isALbumRequested: false,
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
      isALbumRequested: true,
    });
  }

  render() {
    const { searchInput, isButtonDisable, isLoading, albuns, artistName, isALbumRequested } = this.state;
    if (isLoading) return <Loading />;
    console.log(albuns);
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

        { isALbumRequested && !albuns.length && (<p>Nenhum álbum foi encontrado</p>) }

        { isALbumRequested && albuns.length !== 0 && (
          <div>
            <p>
              Resultado de álbuns de:
              {` ${artistName}`}
            </p>
            <div>
              <p>{albuns[0].collectionName}</p>
            </div>
          </div>

        )}
          
          
      </div>
    );
  }
}

export default Search;
