import { DataStorage } from "../interfaces/DataStorage";

export class BrowserStorage implements DataStorage {
  public static useWith(underlyingStorage: Storage): DataStorage {
    return new BrowserStorage(underlyingStorage);
  }

  private storage: Storage;

  private constructor(underlyingStorage: Storage) {
    this.storage = underlyingStorage;
  }

  public loadData(key: string) {
    const retrievedItem = this.storage.getItem(key);

    if (retrievedItem === null) {
      return null;
    }

    return JSON.parse(retrievedItem);
  }

  public saveData(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
