import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const userData = await getUser();
    this.setState({ user: userData });
    console.log(userData);
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <h2 data-testid="header-user-name">
          { user ? user.name : <Loading /> }
        </h2>
        <nav className="nav-bar">
          <Link to="/search" data-testid="link-to-search">
            Pesquisar
          </Link>

          <Link to="/favorites" data-testid="link-to-favorites">
            Favoritos
          </Link>

          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
