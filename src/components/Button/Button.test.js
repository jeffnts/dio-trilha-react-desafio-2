import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders Button with correct text', () => {
    render(<Button>Buscar</Button>);
    const buttonElement = screen.getByText(/Buscar/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders loading state', () => {
    render(<Button loading={true}>Buscar</Button>);
    const buttonElement = screen.getByText(/Carregando.../i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Buscar</Button>);
    const buttonElement = screen.getByText(/Buscar/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});