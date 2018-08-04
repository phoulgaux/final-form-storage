import "jest";
import * as v from "jsverify";
import * as TypeMoq from "typemoq";

import { saveValues } from "./saveValues";

const arbitraryFormState = v.record({
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

test("saveValues calls storage.setItem with proper data", () => {
  v.assert(
    v.forall(
      v.record({
        formState: arbitraryFormState,
        key: v.asciinestring
      }),
      ({ formState, key }) => {
        const storageMock = TypeMoq.Mock.ofType<Storage>();
        storageMock.setup(storage =>
          storage.setItem(TypeMoq.It.isAny(), TypeMoq.It.isAny())
        );

        saveValues({ key, storage: storageMock.object })(formState);

        storageMock.verify(
          storage => storage.setItem(key, JSON.stringify(formState.values)),
          TypeMoq.Times.once()
        );

        return true;
      }
    )
  );
});
