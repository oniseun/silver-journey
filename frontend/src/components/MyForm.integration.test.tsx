import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MyForm from './MyForm';
import axios from '../api/api';

jest.mock('../api/api');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('MyForm Integration Test', () => {
  it('handles conditional fields correctly', async () => {
    const { getByLabelText, getByText, queryByLabelText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/experienced symptoms/i), { target: { value: 'yes' } });

    expect(queryByLabelText(/symptoms/i)).toBeInTheDocument();

    fireEvent.change(getByLabelText(/health condition/i), { target: { value: 'chronic-illness' } });

    expect(queryByLabelText(/chronic condition details/i)).toBeInTheDocument();
  });
});
