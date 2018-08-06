export interface DataStorage {
  loadData(key: string): string;
  saveData(key: string, value: string): void;
}
