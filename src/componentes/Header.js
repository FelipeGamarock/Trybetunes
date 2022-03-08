import React from 'react';
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
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <p data-testid="header-user-name">
          { user ? user.name : <Loading /> }
        </p>
      </header>
    );
  }
}

export default Header;
