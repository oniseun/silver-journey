import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

interface FormData {
  name: string;
  age: number;
  gender: string;
  healthCondition: string;
  experiencedSymptoms: string;
  symptoms?: string;
  chronicConditionDetails?: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").min(0, "Age must be a positive number"),
  gender: yup.string().required("Gender is required"),
  healthCondition: yup.string().required("Health condition is required"),
  experiencedSymptoms: yup.string().required("Please select if you have experienced symptoms"),
  symptoms: yup.string().when('experiencedSymptoms', {
    is: 'yes',
    then: yup.string().required("Please list your symptoms"),
  }),
  chronicConditionDetails: yup.string().when('healthCondition', {
    is: 'Chronic illness',
    then: yup.string().required("Please provide details about your chronic illness"),
  }),
});

const QuestionnaireForm: React.FC = () => {
  const { handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchHealthCondition = watch('healthCondition');
  const watchExperiencedSymptoms = watch('experiencedSymptoms');

  const onSubmit = async  (data: FormData) => {
    console.log(data);
    try {
      await axios.post('http://localhost:3000/questionnaire', data);
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <Controller name="name" control={control} render={({ field }) => <input {...field} />} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Age</label>
        <Controller name="age" control={control} render={({ field }) => <input type="number" {...field} />} />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <div>
        <label>Gender</label>
        <Controller name="gender" control={control} render={({ field }) => <select {...field}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>} />
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>
      <div>
        <label>Health Condition</label>
        <Controller name="healthCondition" control={control} render={({ field }) => <select {...field}>
          <option value="">Select</option>
          <option value="Healthy">Healthy</option>
          <option value="Minor illness">Minor illness</option>
          <option value="Chronic illness">Chronic illness</option>
        </select>} />
        {errors.healthCondition && <span>{errors.healthCondition.message}</span>}
      </div>
      {watchHealthCondition === 'Chronic illness' && (
        <div>
          <label>Chronic Condition Details</label>
          <Controller name="chronicConditionDetails" control={control} render={({ field }) => <input {...field} />} />
          {errors.chronicConditionDetails && <span>{errors.chronicConditionDetails.message}</span>}
        </div>
      )}
      <div>
        <label>Have you experienced any symptoms in the last 14 days?</label>
        <Controller name="experiencedSymptoms" control={control} render={({ field }) => <select {...field}>
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>} />
        {errors.experiencedSymptoms && <span>{errors.experiencedSymptoms.message}</span>}
      </div>
      {watchExperiencedSymptoms === 'yes' && (
        <div>
          <label>Symptoms</label>
          <Controller name="symptoms" control={control} render={({ field }) => <input {...field} />} />
          {errors.symptoms && <span>{errors.symptoms.message}</span>}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionnaireForm;
