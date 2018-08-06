import { MutableState, Mutator } from "final-form";

import { StorageOptions } from "./interfaces/StorageOptions";

type MutatorBuilder = (options: StorageOptions) => Mutator;

export const loadValues: MutatorBuilder = options => (
  _,
  state: MutableState
) => {
  const storageItem = options.storage.loadData(options.key);

  const newValues = storageItem ? JSON.parse(storageItem) : {};

  state.formState.values = newValues;
};
