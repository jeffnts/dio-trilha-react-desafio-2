import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { api } from '../services/api';

jest.mock('../services/api');
jest.useFakeTimers();

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render initial elements', () => {
    render(<App />);
    expect(screen.getByAltText('github logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Digite o nome do repositório/i)).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('should search and add new repositories', async () => {
    const mockData = {
      items: [
        { id: 1, name: 'repo1', full_name: 'user/repo1', html_url: 'https://github.com/user/repo1' },
        { id: 2, name: 'repo2', full_name: 'user/repo2', html_url: 'https://github.com/user/repo2' }
      ]
    };

    api.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);

    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('repo2')).toBeInTheDocument();
    });
  });

  it('should handle duplicate repositories', async () => {
    const mockData = {
      items: [{ 
        id: 1, 
        name: 'repo1', 
        full_name: 'user/repo1',
        html_url: 'https://github.com/user/repo1'
      }]
    };

    api.get.mockResolvedValueOnce({ data: mockData })
       .mockResolvedValueOnce({ data: mockData });

    render(<App />);

    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Repositórios já existem na lista')).toBeInTheDocument();
    });

    jest.advanceTimersByTime(3000);
   
  });

  it('should handle empty search results', async () => {
    api.get.mockResolvedValueOnce({ data: { items: [] } });

    render(<App />);

    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'nonexistent' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Nenhum repositório encontrado')).toBeInTheDocument();
    });
  });

  it('should handle API errors', async () => {
    api.get.mockRejectedValueOnce(new Error('API Error'));

    render(<App />);

    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Erro ao buscar repositórios')).toBeInTheDocument();
    });
  });

  it('should remove repository', async () => {
    const mockData = {
      items: [{ 
        id: 1, 
        name: 'repo1', 
        full_name: 'user/repo1',
        html_url: 'https://github.com/user/repo1'
      }]
    };

    api.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);

    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
    });

    const removeButton = screen.getByText('Remover');
    fireEvent.click(removeButton);

    expect(screen.queryByText('repo1')).not.toBeInTheDocument();
  });

  it('should clear all repositories', async () => {
    const mockData = {
      items: [
        { id: 1, name: 'repo1', full_name: 'user/repo1', html_url: 'https://github.com/user/repo1' },
        { id: 2, name: 'repo2', full_name: 'user/repo2', html_url: 'https://github.com/user/repo2' }
      ]
    };

    api.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);

    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);
    const searchButton = screen.getByText('Buscar');

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('repo2')).toBeInTheDocument();
    });

    const clearButton = screen.getByText('Limpar');
    fireEvent.click(clearButton);

    expect(screen.queryByText('repo1')).not.toBeInTheDocument();
    expect(screen.queryByText('repo2')).not.toBeInTheDocument();
  });

  it('should trigger search when Enter key is pressed', async () => {
    const mockData = {
      items: [
        { id: 1, name: 'repo1', full_name: 'user/repo1', html_url: 'https://github.com/user/repo1' }
      ]
    };

    api.get.mockResolvedValueOnce({ data: mockData });

    render(<App />);
    const input = screen.getByPlaceholderText(/Digite o nome do repositório/i);

    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
    });
  });

  
});