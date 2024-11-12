import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  test('renders Input with correct value', () => {
    render(<Input value="test" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue(/test/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});