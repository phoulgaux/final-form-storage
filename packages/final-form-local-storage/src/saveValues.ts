import { FormSubscriber } from "final-form";

import { IStorageOptions } from "./interfaces/IStorageOptions";

type FormSubscriberBuilder = (options: IStorageOptions) => FormSubscriber;

export const saveValues: FormSubscriberBuilder = options => formState => {
  options.storage.setItem(options.key, JSON.stringify(formState.values));
};
