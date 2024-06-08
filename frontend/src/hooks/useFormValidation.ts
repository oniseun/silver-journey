import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import schema from '../schemas/validationSchema';

const useFormValidation = () => {
  return useForm({
    resolver: superstructResolver(schema),
  });
};

export default useFormValidation;
