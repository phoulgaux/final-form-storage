import * as v from "jsverify";

export const arbitraryInternalFormState = v.record({
  active: v.asciinestring,
  dirtySinceLastSubmit: v.bool,
  error: v.json,
  errors: v.dict(v.string),
  lastSubmittedValues: v.dict(v.string),
  pristine: v.bool,
  submitError: v.json,
  submitErrors: v.dict(v.string),
  submitFailed: v.bool,
  submitSucceeded: v.bool,
  submitting: v.bool,
  valid: v.bool,
  validating: v.integer,
  values: v.dict(v.string)
});
