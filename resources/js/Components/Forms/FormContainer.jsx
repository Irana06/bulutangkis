import classNames from 'classnames';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import Swal from 'sweetalert2';

export const FormContainer = ({ children, form, onSubmit, className = '' }) => {
  const onError = (errors) => {
    console.error(errors);
    const errorMessages = Object.entries(errors)
      .map(([field, error]) => `${field}: ${error?.message || 'Required'}`)
      .join('<br>');

    Swal.fire({
      icon: 'error',
      title: 'Form Submission Error',
      html: errorMessages,
    });
  };

  return (
    <FormProvider {...(form || {})}>
      <form
        className={className}
        onSubmit={onSubmit ? (form ? form.handleSubmit(onSubmit, onError) : onSubmit) : () => {}}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export const FormFooter = ({ children, className }) => {
  return (
    <div className={classNames('flex flex-row justify-start gap-3 mt-5', className)}>
      {children}
    </div>
  );
};
