import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import NotFound from './index';

/* Mocking the useHistory Hook */
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const renderNotFound = () => {
  render(<NotFound />);
};
describe('NotFound', () => {
  it('should render the component', () => {
    renderNotFound();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
  it('should goToPage redirects to home', async () => {
    renderNotFound();
    const GoToHomeItem = screen.getByTestId('go-to-home');
    await fireEvent.click(GoToHomeItem);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });
});
