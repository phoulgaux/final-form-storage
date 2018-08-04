import { IStorageOptions } from "./interfaces/IStorageOptions";

export const loadValues = (options: IStorageOptions) => () => {
  options.storage.getItem(options.key);
};
