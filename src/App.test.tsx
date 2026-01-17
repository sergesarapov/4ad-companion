import { render, screen } from '@testing-library/react';
import App from './App';

test('renders 4AD Companion', () => {
  render(<App />);
  const headerElement = screen.getByText(/4AD Companion/i);
  expect(headerElement).toBeInTheDocument();
});
