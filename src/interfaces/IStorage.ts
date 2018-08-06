export interface IStorage {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
}
