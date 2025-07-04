export interface LocalStorageApi {
  get_item<T>(key: string): T | null;
  set_item<T>(key: string, value: T): void;
  add_item<T>(key: string, value: T): void;
  clear(): void;
}
