import type {
  EntityManager,
  EntityTarget,
  FindOptionsRelations,
  FindOptionsWhere,
  InsertResult,
  ObjectLiteral,
  UpdateResult,
} from "typeorm";
import type { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

// ** =============================================================== ** //
// **                              Types                              ** //
// ** =============================================================== ** //

// ** The `Array<>` variation is used for when you want to find where 'OR'
export type WhereOptions<Entity extends ObjectLiteral> =
  | FindOptionsWhere<Entity>
  | Array<FindOptionsWhere<Entity>>;

export type EntityRelation<Entity extends ObjectLiteral> = FindOptionsRelations<Entity>;

export type EntityData<Entity extends ObjectLiteral> = QueryDeepPartialEntity<Entity>;

export type SingleColumn<Entity extends ObjectLiteral> = keyof Entity;
export type MultipleColumns<Entity extends ObjectLiteral> = Array<
  Extract<keyof Entity, string>
>;

export type OrderBy<Entity extends ObjectLiteral> = {
  sort: Extract<keyof Entity, string>;
  order?: "ASC" | "DESC";
  nulls?: "NULLS FIRST" | "NULLS LAST";
};

// ** ======================= Query Structures ====================== ** //
export type InsertReturnStructure = "RAW" | "MAPPED" | "IDENTIFIERS";
export type UpdateReturnStructure = "RAW" | "MAPPED" | "AFFECTED";

export type InsertMappedOrRawResult<
  Entity extends ObjectLiteral,
  RetStruct extends InsertReturnStructure,
> = RetStruct extends "MAPPED"
  ? Entity
  : RetStruct extends "IDENTIFIERS"
    ? EntityData<Entity>
    : RetStruct extends "RAW"
      ? InsertResult
      : unknown;

export type UpdateMappedOrRawResult<
  Entity extends ObjectLiteral,
  RetStruct extends UpdateReturnStructure,
> = RetStruct extends "MAPPED"
  ? Entity
  : RetStruct extends "AFFECTED"
    ? number
    : RetStruct extends "RAW"
      ? UpdateResult
      : unknown;
// ** =============================================================== ** //
// **                            Interfaces                           ** //
// ** =============================================================== ** //
// ** ============================= Base ============================ ** //
export interface IEntityTarget<Entity extends ObjectLiteral> {
  targetEntity: EntityTarget<Entity> & { tableName?: string };
}

export interface IWhere<Entity extends ObjectLiteral> {
  where: WhereOptions<Entity>;
}

export interface IUpdateData<Entity extends ObjectLiteral> {
  updateData: EntityData<Entity>;
}

export interface ICreationData<Entity extends ObjectLiteral> {
  creationData: EntityData<Entity>;
}

export interface IRelations<Entity extends ObjectLiteral> {
  relations?: EntityRelation<Entity>;
}

export interface IWithDeleted {
  withDeleted?: boolean;
}

export interface IReturnColumns<Entity extends ObjectLiteral> {
  returnColumns?: MultipleColumns<Entity>;
}

export interface IReturnStructure<
  RetStruct extends InsertReturnStructure | UpdateReturnStructure,
> {
  returnStructure: RetStruct;
}

export interface IOrder<Entity extends ObjectLiteral> {
  orderBy: OrderBy<Entity>;
}

export interface ITransactionEM {
  transactionEM?: EntityManager;
}

// ** =========================== Compound ========================== ** //
export interface IGetOne<Entity extends ObjectLiteral>
  extends IEntityTarget<Entity>,
    IWhere<Entity>,
    IRelations<Entity>,
    IReturnColumns<Entity>,
    IWithDeleted,
    ITransactionEM {}

export interface IFindOne<Entity extends ObjectLiteral>
  extends IEntityTarget<Entity>,
    IWhere<Entity>,
    IRelations<Entity>,
    IReturnColumns<Entity>,
    IWithDeleted,
    ITransactionEM {}

export interface IFindMany<Entity extends ObjectLiteral>
  extends IEntityTarget<Entity>,
    IWhere<Entity>,
    IRelations<Entity>,
    IReturnColumns<Entity>,
    IWithDeleted,
    ITransactionEM {}

export interface ICreate<
  Entity extends ObjectLiteral,
  RetStruct extends InsertReturnStructure,
> extends IEntityTarget<Entity>,
    ICreationData<Entity>,
    IReturnStructure<RetStruct>,
    ITransactionEM {}

export interface IUpdate<
  Entity extends ObjectLiteral,
  RetStruct extends UpdateReturnStructure,
> extends IEntityTarget<Entity>,
    IWhere<Entity>,
    IUpdateData<Entity>,
    IReturnStructure<RetStruct>,
    ITransactionEM {}

export interface IDelete<Entity extends ObjectLiteral>
  extends IEntityTarget<Entity>,
    IWhere<Entity>,
    ITransactionEM {}
