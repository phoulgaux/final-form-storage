import * as v from "jsverify";

export const arbitraryFormState = v.record({
  active: v.asciinestring,
  dirty: v.bool,
  dirtySinceLastSubmit: v.bool,
  error: v.json,
  errors: v.dict(v.string),
  hasSubmitErrors: v.bool,
  hasValidationErrors: v.bool,
  initialValues: v.dict(v.string),
  invalid: v.bool,
  pristine: v.bool,
  submitError: v.json,
  submitErrors: v.dict(v.string),
  submitFailed: v.bool,
  submitSucceeded: v.bool,
  submitting: v.bool,
  touched: v.dict(v.bool),
  valid: v.bool,
  validating: v.bool,
  values: v.dict(v.string),
  visited: v.dict(v.bool)
});
