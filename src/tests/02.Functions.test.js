import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { getAllChildrens, getAllParents } from '../services/inputs';
import App from '../App';

describe('2 - Teste as funções da página', () => {
  test('Se ao selecionar um checkbox seu estado é cascateado aos filhos.', () => {
    render(<App />);
    const checkbox = screen.getAllByTestId('data-checkbox');

    fireEvent.click(checkbox[0]);

    getAllChildrens(checkbox[0]).forEach((input) => {
      expect(input.checked).toBe(true);
    });

    fireEvent.click(checkbox[0]);

    getAllChildrens(checkbox[0]).forEach((input) => {
      expect(input.checked).toBe(false);
    });
  });

  test('Se ao selecionar um checkbox seu pai mudará para indeterminate caso tenha mais que 1 filho e checked caso contrário.', () => {
    render(<App />);
    const checkbox = screen.getAllByTestId('data-checkbox');
    const randomIndex = Math.floor(Math.random() * checkbox.length);

    fireEvent.click(checkbox[randomIndex]);

    getAllParents(checkbox[randomIndex]).forEach((input) => {
      const key = ['checked', 'indeterminate'];
      expect(input[key[+(getAllChildrens(input).length > 1)]]).toBe(true);
    });
  });

  test.only('Se ao selecionar todos os checkbox filhos o pai será marcado como checked.', () => {
    render(<App />);
    const checkbox = screen.getAllByTestId('data-checkbox');
    const randomIndex = Math.floor(Math.random() * checkbox.length);

    getAllChildrens(checkbox[randomIndex]).forEach((input) => {
      if (getAllParents(input)[0] === checkbox[randomIndex]) fireEvent.click(input);
    });

    expect(checkbox[randomIndex].checked)
      .toBe(getAllChildrens(checkbox[randomIndex]).length > 0);
  });

  test('O botão hidden.', () => {
    render(<App />);
    const hiddenBtn = screen.getAllByTestId('hidden-btn');
    const randomIndex = Math.floor(Math.random() * hiddenBtn.length);

    fireEvent.click(hiddenBtn[randomIndex]);
    const hiddenIcon = screen.getByTestId('hidden-icon');
    expect(hiddenIcon).toBeInTheDocument();
  });
});
