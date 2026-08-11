export interface IGenericRepository<T> {
  create(entity: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  update(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}