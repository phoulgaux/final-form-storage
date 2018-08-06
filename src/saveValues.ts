import { FormSubscriber } from "final-form";

import { StorageOptions } from "./interfaces/StorageOptions";

type FormSubscriberBuilder = (options: StorageOptions) => FormSubscriber;

export const saveValues: FormSubscriberBuilder = options => formState => {
  options.storage.saveData(options.key, JSON.stringify(formState.values));
};
