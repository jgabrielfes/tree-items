import React from 'react';
import { render, screen } from '@testing-library/react';
import recursiveCount from './helpers/recursiveCount';
import data from '../utils/data.json';
import App from '../App';

describe('1 - Teste os componentes da página', () => {
  test('Se a página contém o título.', () => {
    render(<App />);

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
  });

  test('Se a página contém a seção principal.', () => {
    render(<App />);

    expect(screen.getByTestId('application-section')).toBeInTheDocument();
  });

  test('Se a página contém todos os checkbox necessários', () => {
    render(<App />);
    const checkbox = screen.getAllByTestId('data-checkbox');

    expect(checkbox.length).toBe(recursiveCount(data));
  });
});
