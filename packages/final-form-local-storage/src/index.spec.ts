import * as jsc from "jsverify";
import "jest-localstorage-mock";

import { createForm, FormApi } from "final-form";

import connectToLocalStorage from ".";

const getTestForm = () => createForm({ onSubmit: () => {} });

beforeEach(() => {
  localStorage.clear();
});

jsc.property("The default key to save with is 'form'", jsc.json, values => {
  const form = getTestForm();
  connectToLocalStorage({ form });

  expect(localStorage.setItem).toHaveBeenCalledWith("form", expect.any(String));
  return true;
});
