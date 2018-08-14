export interface DataStorage {
  loadData(key: string): any;
  saveData(key: string, value: any): void;
}
