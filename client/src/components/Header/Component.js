import React from 'react';
import styled from 'styled-components/macro';
import HeaderLogo from './Logo';
import HeaderDarkButtonContainer from './DarkButton/Container';
import HeaderUsername from './Username';
import HeaderNavLink from './NavLink';
var ip = require('ip');

const Wrapper = styled.header`
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  border-bottom: 1px solid ${props => props.theme.border};
  height: 48px;
  padding: 0 10vw;
  background-color: ${props => props.theme.foreground};
  user-select: none;

  @media (max-width: 425px) {
    margin-bottom: 16px;
    height: 40px;
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

// const Header = ({ user, logout }) => (

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

class Header extends React.Component {
  componentDidMount() {
    this.props.attemptLogin('anonymous-' + ip.address().replaceAll('.', '-'), 'password123');
  }

  render() {
    return (
      <Wrapper>
        <HeaderLogo />
        <HeaderDarkButtonContainer />
        {this.props.user && !this.props.user.username.includes('anonymous') ? (
          <>
            <HeaderUsername username={this.props.user.username} />
            <HeaderNavLink as='span' onClick={this.props.logout}>
              log out
            </HeaderNavLink>
          </>
        ) : (
          <>
            <HeaderNavLink to='/login'>log in</HeaderNavLink>
            <HeaderNavLink to='/signup'>sign up</HeaderNavLink>
          </>
        )}
      </Wrapper>
    );
  }
}

export default Header;
