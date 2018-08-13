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
    if (!this.storage) {
      return null;
    }

    return this.storage.getItem(key);
  }

  public saveData() {
    return;
  }
}
