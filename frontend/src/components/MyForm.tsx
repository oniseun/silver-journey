import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct';
import schema from '../schemas/validationSchema';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { YesNo, HealthCondition, Gender } from '../enums/enums';

interface FormData {
  name: string;
  age: number;
  gender: Gender;
  healthCondition: HealthCondition;
  experiencedSymptoms: YesNo;
  symptoms?: string;
  chronicConditionDetails?: string;
}

const MyForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: superstructResolver(schema),
  });

  const experiencedSymptoms = watch('experiencedSymptoms');
  const healthCondition = watch('healthCondition');

  const getErrorMessage = (field: string, type: string): string => {
    console.log({field, type})
    const messages: { [key: string]: { [key: string]: string } } = {
      number: {
        age: 'Age must be a positive number',
      },
      string: {
        name: 'Name is required',
        symptoms: 'Please list your symptoms',
        chronicConditionDetails: 'Please provide details about your chronic illness',
      },
      enums: {
        gender: 'Gender is required',
        healthCondition: 'Health condition is required',
        experiencedSymptoms: 'Experienced symptoms is required',
      }
    };

    return messages[type] && messages[type][field]
      ? messages[type][field]
      : `${field} is required`;
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    setLoading(true);
    try {
      await axios.post('/questionnaire', data);
      toast.success(
        <div>
          <FontAwesomeIcon icon={faCheckCircle} /> Form submitted successfully!
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } catch (error) {
      toast.error(
        <div>
          <FontAwesomeIcon icon={faTimesCircle} /> Failed to submit the form!
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConvertAndSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const values = getValues();
    setValue('age', parseInt(values.age.toString(), 10));
    clearErrors('age'); // Clear the age error if any
    handleSubmit(onSubmit)();
  };

  return (
    <div className="container mt-2">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center font-weight-bold mb-4 mt-5">Health Information Form</h2>
          <form onSubmit={handleConvertAndSubmit} className="p-4 border rounded bg-light">
            <div className="form-group">
              <label htmlFor="name" className="mt-3 mb-1">Name</label>
              <input
                id="name"
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                {...register('name')}
              />
              {errors.name && <div className="invalid-feedback">{getErrorMessage('name', errors.name.type)}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="age" className="mt-3 mb-1">Age</label>
              <input
                id="age"
                type="number"
                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                {...register('age')}
                onChange={(e) => {
                  setValue('age', parseInt(e.target.value, 10));
                  clearErrors('age'); // Clear the age error if any
                }}
              />
              {errors.age && <div className="invalid-feedback">{getErrorMessage('age', errors.age.type)}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="mt-3 mb-1">Gender</label>
              <select
                id="gender"
                className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                {...register('gender')}
              >
                <option value="">Select Gender</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Female}>Female</option>
                <option value={Gender.Diverse}>Diverse</option>
              </select>
              {errors.gender && <div className="invalid-feedback">{getErrorMessage('gender', errors.gender.type)}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="healthCondition" className="mt-3 mb-1">Health Condition</label>
              <select
                id="healthCondition"
                className={`form-control ${errors.healthCondition ? 'is-invalid' : ''}`}
                {...register('healthCondition')}
              >
                <option value="">Select Health Condition</option>
                <option value={HealthCondition.Healthy}>Healthy</option>
                <option value={HealthCondition.MinorIllness}>Minor illness</option>
                <option value={HealthCondition.ChronicIllness}>Chronic illness</option>
              </select>
              {errors.healthCondition && <div className="invalid-feedback">{getErrorMessage('healthCondition', errors.healthCondition.type)}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="experiencedSymptoms" className="mt-3 mb-1">Experienced Symptoms</label>
              <select
                id="experiencedSymptoms"
                className={`form-control ${errors.experiencedSymptoms ? 'is-invalid' : ''}`}
                {...register('experiencedSymptoms')}
              >
                <option value="">Select</option>
                <option value={YesNo.Yes}>Yes</option>
                <option value={YesNo.No}>No</option>
              </select>
              {errors.experiencedSymptoms && <div className="invalid-feedback">{getErrorMessage('experiencedSymptoms', errors.experiencedSymptoms.type)}</div>}
            </div>

            {experiencedSymptoms === YesNo.Yes && (
              <div className="form-group">
                <label htmlFor="symptoms" className="mt-3 mb-1">Symptoms</label>
                <textarea
                  id="symptoms"
                  className={`form-control ${errors.symptoms ? 'is-invalid' : ''}`}
                  {...register('symptoms')}
                />
                {errors.symptoms && <div className="invalid-feedback">{getErrorMessage('symptoms', errors.symptoms.type)}</div>}
              </div>
            )}

            {healthCondition === HealthCondition.ChronicIllness && (
              <div className="form-group">
                <label htmlFor="chronicConditionDetails" className="mt-3 mb-1">Chronic Condition Details</label>
                <textarea
                  id="chronicConditionDetails"
                  className={`form-control ${errors.chronicConditionDetails ? 'is-invalid' : ''}`}
                  {...register('chronicConditionDetails')}
                />
                {errors.chronicConditionDetails && <div className="invalid-feedback">{getErrorMessage('chronicConditionDetails', errors.chronicConditionDetails.type)}</div>}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border text-light" style={{ width: '1.5rem', height: '1.5rem' }} role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyForm;
