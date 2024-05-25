import { Injectable } from "@nestjs/common";
import {
  DeleteResult,
  EntityManager,
  getMetadataArgsStorage,
  ObjectLiteral,
} from "typeorm";

import { PostgresTransactionService } from "@/base/modules/postgres/postgres.transaction.service";
import type {
  ICreate,
  IDelete,
  IEntityTarget,
  IFindMany,
  IFindOne,
  IGetOne,
  InsertMappedOrRawResult,
  InsertReturnStructure,
  IUpdate,
  UpdateMappedOrRawResult,
  UpdateReturnStructure,
} from "@/base/modules/postgres/types/query.typing";
import type { Hopefully } from "@/base/types/general.typing";

@Injectable()
export class PostgresQueryManager {
  private __entityManager: EntityManager;

  constructor(private readonly transactionService: PostgresTransactionService) {
    this.__entityManager = this.transactionService.getEntityManager();
  }

  // ** =============================================================== ** //
  // **                           Meta Methods                          ** //
  // ** =============================================================== ** //
  public tableName<Entity extends ObjectLiteral>({
    targetEntity,
  }: IEntityTarget<Entity>): string {
    if (targetEntity.tableName) {
      return targetEntity.tableName;
    }

    return <string>(
      getMetadataArgsStorage().tables.find((table) => table.target === targetEntity)
        ?.name
    );
  }

  // ** =============================================================== ** //
  // **                            Get / Find                           ** //
  // ** =============================================================== ** //
  public async getOne<Entity extends ObjectLiteral>({
    targetEntity,
    where,
    relations,
    returnColumns,
    withDeleted,
    transactionEM,
  }: IGetOne<Entity>): Promise<Entity> {
    return (transactionEM ?? this.__entityManager).findOneOrFail(targetEntity, {
      where: where,
      relations: relations,
      select: returnColumns,
      withDeleted: withDeleted,
    });
  }

  public async findOne<Entity extends ObjectLiteral>({
    targetEntity,
    where,
    relations,
    returnColumns,
    withDeleted,
    transactionEM,
  }: IFindOne<Entity>): Promise<Hopefully<Entity>> {
    return (transactionEM ?? this.__entityManager).findOne(targetEntity, {
      where: where,
      relations: relations,
      select: returnColumns,
      withDeleted: withDeleted,
    });
  }

  public async findMany<Entity extends ObjectLiteral>({
    targetEntity,
    where,
    relations,
    returnColumns,
    withDeleted,
    transactionEM,
  }: IFindMany<Entity>): Promise<Array<Entity>> {
    return (transactionEM ?? this.__entityManager).find(targetEntity, {
      where: where,
      relations: relations,
      select: returnColumns,
      withDeleted: withDeleted,
    });
  }

  // ** =============================================================== ** //
  // **                              Create                             ** //
  // ** =============================================================== ** //
  // ** ========================== Overloads ========================== ** //
  public async createOne<
    Entity extends ObjectLiteral,
    RetStruct extends InsertReturnStructure,
  >({
    targetEntity,
    creationData,
    returnStructure,
    transactionEM,
  }: ICreate<Entity, RetStruct>): Promise<InsertMappedOrRawResult<Entity, RetStruct>>;

  // ** ======================== Implementation ======================= ** //
  public async createOne<Entity extends ObjectLiteral>({
    targetEntity,
    creationData,
    returnStructure,
    transactionEM,
  }: ICreate<Entity, InsertReturnStructure>) {
    const insertPromise = (transactionEM ?? this.__entityManager).insert(
      targetEntity,
      creationData,
    );
    switch (returnStructure) {
      case "IDENTIFIERS":
        return <Entity>(await insertPromise).identifiers[0];
      case "MAPPED":
        return <Entity>(await insertPromise).generatedMaps[0];
      case "RAW":
      case undefined:
      case null:
      default:
        return insertPromise;
    }
  }

  // ** =============================================================== ** //
  // **                              Update                             ** //
  // ** =============================================================== ** //
  // ** ========================== Overloads ========================== ** //
  public async partialUpdate<
    Entity extends ObjectLiteral,
    RetStruct extends UpdateReturnStructure,
  >({
    targetEntity,
    where,
    updateData,
    transactionEM,
  }: IUpdate<Entity, RetStruct>): Promise<UpdateMappedOrRawResult<Entity, RetStruct>>;

  // ** ======================== Implementation ======================= ** //
  public async partialUpdate<Entity extends ObjectLiteral>({
    targetEntity,
    where,
    updateData,
    returnStructure,
    transactionEM,
  }: IUpdate<Entity, UpdateReturnStructure>) {
    const updatePromise = (transactionEM ?? this.__entityManager).update(
      targetEntity,
      where,
      updateData,
    );

    switch (returnStructure) {
      case "AFFECTED":
        return <number>(await updatePromise).affected;
      case "MAPPED":
        return <Array<Entity>>(await updatePromise).generatedMaps;
      case "RAW":
      case undefined:
      case null:
      default:
        return updatePromise;
    }
  }

  // ** =============================================================== ** //
  // **                              Delete                             ** //
  // ** =============================================================== ** //
  public async hardDelete<Entity extends ObjectLiteral>({
    targetEntity,
    where,
    transactionEM,
  }: IDelete<Entity>): Promise<DeleteResult> {
    return (transactionEM ?? this.__entityManager).delete(targetEntity, where);
  }

  public async softDelete<Entity extends ObjectLiteral>({
    targetEntity,
    where,
    transactionEM,
  }: IDelete<Entity>) {
    return (transactionEM ?? this.__entityManager).softDelete(targetEntity, where);
  }
}
