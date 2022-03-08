import React from 'react';
import Header from '../componentes/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Edit Profile</h1>
      </div>
    );
  }
}

export default ProfileEdit;
