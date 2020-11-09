import React from 'react';
import { render, screen } from '@testing-library/react';
import Test from '../src/components/test';

describe('test Home', () => {
  it('render default Home', () => {
    render(<Test />);
    const element = screen.getByText('test');
    expect(element).toBeInTheDocument();
  });
});
