import { useCallback } from 'react';

const useFormValidation = () => {
  const validateForm = useCallback((formRef) => {
    if (!formRef || !formRef.current) return false;
    const inputs = formRef.current.querySelectorAll('input');
    return Array.from(inputs).every((input) => input.checkValidity());
  }, []);

  return { validateForm };
};

export default useFormValidation;
