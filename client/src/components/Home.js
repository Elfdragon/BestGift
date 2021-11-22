import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Icon, Input, Item } from 'semantic-ui-react';

import api from '../apis/server';

const Home = props => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('cart')) {
      sessionStorage.setItem('cart',[]);
    }
    const fetchProducts = async () => {
      const response = await api.get('/products');
      if (response.data) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, [page]);

  const addToCart = prodId => {
    if (!props.isAuth) {
      let products = [];
      if (sessionStorage.getItem('cart')) {
        products = JSON.parse(sessionStorage.getItem('cart'));
      }
      products.push({ prodId: prodId});
      sessionStorage.setItem('cart', JSON.stringify(products));
    }
  };

  return (
    <>
      <Form onSubmit={() => console.log('test2')}>
        <Input
          loading={loading}
          icon={<Icon name="search" link onClick={() => console.log('test')} />}
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </Form>
      <Item.Group>
        {products.map(prod => (
          <Item key={prod.id}>
            <Item.Image size="tiny" src={prod.image} />

            <Item.Content>
              <Item.Header as="a">{prod.title}</Item.Header>
              <Item.Meta>{prod.price}</Item.Meta>
              <Item.Extra>{prod.description}</Item.Extra>
              <Item.Extra>
                <Button
                  animated="vertical"
                  basic
                  onClick={() => addToCart(prod.id)}
                >
                  <Button.Content hidden>Add </Button.Content>
                  <Button.Content visible>
                    <Icon size="large" name="cart plus" />
                  </Button.Content>
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </>
  );
};

export default Home;
