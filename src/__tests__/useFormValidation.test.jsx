import { renderHook } from '@testing-library/react'
import useFormValidation from '../hooks/useFormValidation'

test('retorna false quando nao existe formRef', () => {
  const { result } = renderHook(() => useFormValidation())

  expect(result.current.validateForm(null)).toBe(false)
  expect(result.current.validateForm({ current: null })).toBe(false)
})

test('retorna true quando todos os inputs sao validos', () => {
  const { result } = renderHook(() => useFormValidation())

  const formRef = {
    current: {
      querySelectorAll: () => [
        { checkValidity: () => true },
        { checkValidity: () => true },
      ],
    },
  }

  expect(result.current.validateForm(formRef)).toBe(true)
})
