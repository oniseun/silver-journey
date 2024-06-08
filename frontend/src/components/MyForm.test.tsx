import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MyForm from './MyForm';
import axios from '../api/api';

jest.mock('../api/api');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('MyForm Component', () => {
  it('validates form inputs', async () => {
    const { getByLabelText, getByText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: '' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: 'abc' } });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/name is required/i)).toBeInTheDocument();
      expect(getByText(/expected a number/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { success: true } });

    const { getByLabelText, getByText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: '30' } });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalled();
    });
  });
});
