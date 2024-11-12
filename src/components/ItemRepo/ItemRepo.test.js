import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemRepo from './ItemRepo';

const repo = {
  id: 1,
  name: 'repo-name',
  full_name: 'user/repo-name',
  html_url: 'https://github.com/user/repo-name'
};

describe('ItemRepo component', () => {
  test('renders ItemRepo with correct data', () => {
    render(<ItemRepo repo={repo} handleRemoveRepo={() => {}} />);
    const nameElement = screen.getByText('repo-name');
    const fullNameElement = screen.getByText('user/repo-name');
    expect(nameElement).toBeInTheDocument();
    expect(fullNameElement).toBeInTheDocument();
  });

  test('calls handleRemoveRepo when remove button is clicked', () => {
    const handleRemoveRepo = jest.fn();
    render(<ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />);
    const removeButton = screen.getByText(/Remover/i);
    fireEvent.click(removeButton);
    expect(handleRemoveRepo).toHaveBeenCalledTimes(1);
  });

  test('opens repository link in a new tab when "Ver repositório" button is clicked', () => {
    window.open = jest.fn(); 
    render(<ItemRepo repo={repo} handleRemoveRepo={() => {}} />);
    const viewRepoButton = screen.getByText(/Ver repositório/i);
    fireEvent.click(viewRepoButton);
    expect(window.open).toHaveBeenCalledWith(repo.html_url, '_blank');
  });
});