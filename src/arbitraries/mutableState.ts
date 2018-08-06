import * as v from "jsverify";

import { arbitraryInternalFormState } from "./internalFormState";

export const arbitraryMutableState = v.record({
  fields: v.dict(v.constant({})),
  formState: arbitraryInternalFormState
});
