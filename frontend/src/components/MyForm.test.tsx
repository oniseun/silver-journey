import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MyForm from './MyForm';
import axios from '../api/api';

jest.mock('../api/api');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('MyForm Component', () => {
    it('validates form inputs', async () => {
        const { getByLabelText, getByText } = render(<MyForm />);
    
        fireEvent.click(getByText(/submit/i));
    
        await waitFor(() => {
          expect(getByText(/Name is required/i)).toBeInTheDocument();
          expect(getByText(/Age must be a positive number/i)).toBeInTheDocument();
          expect(getByText(/Gender is required/i)).toBeInTheDocument();
          expect(getByText(/Health condition is required/i)).toBeInTheDocument();
          expect(getByText(/Experienced symptoms is required/i)).toBeInTheDocument();
        });
      });
    
  it('submits the form successfully', async () => {
    mockAxios.post.mockResolvedValueOnce({ data: { success: true } });

    const { getByLabelText, getByText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(getByLabelText(/gender/i), { target: { value: 'male' } });
    fireEvent.change(getByLabelText(/health condition/i), { target: { value: 'healthy' } });
    fireEvent.change(getByLabelText(/experienced symptoms/i), { target: { value: 'no' } });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalled();
    });
  });

  it('validates form for healthy status with symptoms where symptoms is not filled', async () => {
    const { getByLabelText, getByText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: '30' } });
    fireEvent.change(getByLabelText(/gender/i), { target: { value: 'male' } });
    fireEvent.change(getByLabelText(/health condition/i), { target: { value: 'healthy' } });
    fireEvent.change(getByLabelText(/experienced symptoms/i), { target: { value: 'yes' } });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/Please list your symptoms/i)).toBeInTheDocument();
    });
  });

  it('validates form for minor illness with symptoms where symptoms is not filled', async () => {
    const { getByLabelText, getByText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: '25' } });
    fireEvent.change(getByLabelText(/gender/i), { target: { value: 'female' } });
    fireEvent.change(getByLabelText(/health condition/i), { target: { value: 'minor-illness' } });
    fireEvent.change(getByLabelText(/experienced symptoms/i), { target: { value: 'yes' } });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/Please list your symptoms/i)).toBeInTheDocument();
    });
  });

  it('validates form for chronic illness where symptoms and chronic conditions are not filled', async () => {
    const { getByLabelText, getByText } = render(<MyForm />);

    fireEvent.change(getByLabelText(/name/i), { target: { value: 'Jim Doe' } });
    fireEvent.change(getByLabelText(/age/i), { target: { value: '40' } });
    fireEvent.change(getByLabelText(/gender/i), { target: { value: 'diverse' } });
    fireEvent.change(getByLabelText(/health condition/i), { target: { value: 'chronic-illness' } });
    fireEvent.change(getByLabelText(/experienced symptoms/i), { target: { value: 'yes' } });

    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/Please list your symptoms/i)).toBeInTheDocument();
      expect(getByText(/Please provide details about your chronic illness/i)).toBeInTheDocument();
    });
  });
});
