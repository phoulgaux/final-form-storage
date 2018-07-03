import { FormState, FormApi, FormSubscription, AnyObject } from "final-form";
import _ from "lodash";

interface LocalStorageOptions {
  form: FormApi;
  key?: string;
  storage?: Storage;
  subscription?: FormSubscription;
}

const defaultOptions = (options: LocalStorageOptions) => {
  const form = options.form;
  const key = options.key || "form";
  const storage = options.storage || window.localStorage;
  const subscription = options.subscription || { values: true };
  return { storage, key, form, subscription };
};

const connectToLocalStorage = (options: LocalStorageOptions) => {
  const { storage, key, form, subscription } = defaultOptions(options);

  const subscriber = (state: FormState) => {
    const values = storage.getItem(key);
    if (values && state.pristine) {
      form.batch(() => {
        const entries = mapValuesToEntries(values);
        entries.forEach(([key, value]) => {
          const field = form.getFieldState(key);
          if (field) {
            field.change(value);
          }
        });
      });
    } else {
      const serializedValues = JSON.stringify(state.values);
      storage.setItem(key, serializedValues);
    }
  };

  return form.subscribe(subscriber, subscription);
};

export default connectToLocalStorage;
function mapValuesToEntries(values: string) {
  const parsedValues = JSON.parse(values) as AnyObject;
  const entries = _.entries(parsedValues);
  return entries;
}
