import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './src/components/Header'; 
import AddEdit from './src/pages/AddEdit';
import Home from './src/pages/Home'
'


test('it renders correctly', () => {
  render( Home/>);
  const element = screen.getByText(  'header-1') ; 
  expect(element).toBeInTheDocument();
});