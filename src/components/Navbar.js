import React, {Component} from 'react';

import './Navbar.scss';

class NavBar extends Component {
  handleClick (e) {
    e.preventDefault ();
    this.context.router.transitionTo ('/profile');
  }

  render () {
    return (
      <div className="nav-bar">
        <div className="navbar-title">Adyen</div>
      </div>
    );
  }
}

export default NavBar;
