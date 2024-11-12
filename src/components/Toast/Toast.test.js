import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';

describe('Toast component', () => {
  test('renders Toast with correct message', () => {
    render(<Toast message="Erro ao buscar repositórios" show={true} onClose={() => {}} />);
    const toastElement = screen.getByText(/Erro ao buscar repositórios/i);
    expect(toastElement).toBeInTheDocument();
  });

});