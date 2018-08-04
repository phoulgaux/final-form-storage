import { FormState, FormSubscriber } from "final-form";

interface IStorage {
  setItem(key: string, value: string): void;
}

interface IStorageOptions {
  key: string;
  storage: IStorage;
}

type FormSubscriberBuilder = (options: IStorageOptions) => FormSubscriber;

export const saveValues: FormSubscriberBuilder = options => formState => {
  options.storage.setItem(options.key, JSON.stringify(formState.values));
};
