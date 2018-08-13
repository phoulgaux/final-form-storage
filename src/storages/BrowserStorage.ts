import { DataStorage } from "../interfaces/DataStorage";

export class BrowserStorage implements DataStorage {
  public static useWith(underlyingStorage: Storage): DataStorage {
    return new BrowserStorage(underlyingStorage);
  }

  private storage: Storage | null = null;

  private constructor(underlyingStorage: Storage) {
    this.storage = underlyingStorage;
  }

  public loadData(key: string) {
    if (this.storage === null) {
      return null;
    }

    const retrievedItem = this.storage.getItem(key);

    if (retrievedItem === null) {
      return null;
    }

    return JSON.parse(retrievedItem);
  }

  public saveData() {
    return;
  }
}
