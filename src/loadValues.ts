import { MutableState, Mutator } from "final-form";

import { IStorageOptions } from "./interfaces/IStorageOptions";

type MutatorBuilder = (options: IStorageOptions) => Mutator;

export const loadValues: MutatorBuilder = options => (
  _,
  state: MutableState
) => {
  const storageItem = options.storage.getItem(options.key);

  const newValues = storageItem ? JSON.parse(storageItem) : {};

  state.formState.values = newValues;
};
