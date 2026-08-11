import { DataSource, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

import { IGenericRepository } from "../../domain/interfaces/repositories/IGenericRepository";

export abstract class GenericRepository<TModel, TEntity extends ObjectLiteral & { id: number }>
  implements IGenericRepository<TModel>
{
  protected readonly repository: Repository<TEntity>;

  protected constructor(dataSource: DataSource, entityTarget: EntityTarget<TEntity>) {
    this.repository = dataSource.getRepository(entityTarget);
  }

  protected abstract toDomain(entity: TEntity): TModel;
  protected abstract toEntity(model: TModel): TEntity;

  async create(model: TModel): Promise<TModel> {
    const entity = this.toEntity(model);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<TModel[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<TModel | null> {
    const entity = await this.repository.findOneBy({ id } as FindOptionsWhere<TEntity>);
    return entity ? this.toDomain(entity) : null;
  }

  async update(model: TModel): Promise<TModel> {
    const entity = this.toEntity(model);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
