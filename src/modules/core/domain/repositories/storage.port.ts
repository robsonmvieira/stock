export interface IStorage {
  createObject(folder: string, key: string, file: Buffer): Promise<void>
  get(key: string): Promise<string>
  delete(key: string): Promise<void>
}
