import React from 'react';
import { Button, Container, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Link to="/" className="item">
          <Icon name="gift" size="large" /> BestGift
        </Link>
        <Link to="/" className="item">
          Home
        </Link>
        {props.isAuth && (
          <Link to="/add-item" className="item">
            Add Item
          </Link>
        )}

        <Menu.Menu position="right">
          <Menu.Item>
            {props.isAuth ? (
              <Button negative onClick={() => props.setIsAuth(false)}>
                Logout
              </Button>
            ) : (
              <Link to="/login" className="item">
                Login
              </Link>
            )}
          </Menu.Item>
          <Link to="/cart" className="item">
            <Button animated="vertical" basic inverted>
              <Button.Content hidden>Cart</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>
          </Link>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Header;
