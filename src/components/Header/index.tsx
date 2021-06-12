import React from 'react';
import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, HeaderContainer, Profile } from './styles';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContainer>
        <img src={logo} alt="SpaceHub" />

        <Profile>
          <img src={user.avatar_url} alt={user.name} />
          <div>
            <span>Bem-vindo,</span>

            <Link to="/profile">
              <strong>{user.name}</strong>
            </Link>
          </div>
        </Profile>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
