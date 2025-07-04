/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';


test('renders welcome message', () => {
  render(<RoleList />);
  expect(screen.getByText('Role Permission List')).toBeInTheDocument();
});