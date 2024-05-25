// ** Why? Because I HAVE FUCKING HAD IT WITH THIS FUCKING PIECE OF SHIT USELESS SO-CALLED ORM AND
// ** IT'S RETARDED MD5 GENERATED CONSTRAINTS NAMES WHICH RESULTS IN HILARIOUS FUCKING ERROR MESSAGES.
// **
// ** (calms down)
// **
// ** So I have decided to generate my own foreign key constraint names following the PostgreSQL's
// ** naming convention (with some added information regarding cardinality) Which goes something like:
// **
// ** The standard names for indexes in PostgreSQL are:
// **    `{Table Name}_{Column Name(s)}_{Suffix}`
// **
// ** where the `suffix` is one of the following:
// **   - `pkey`   for a   Primary Key constraint
// **   - `key`    for a   Unique constraint
// **   - `excl`   for an  Exclusion constraint
// **   - `idx`    for any other kind of index
// **   - `fkey`   for a   Foreign key
// **   - `check`  for a   Check constraint
// **
// ** Standard suffix for sequences is

import { EntityTarget, getMetadataArgsStorage, ObjectLiteral } from "typeorm";

import { Hopefully } from "@/base/types/general.typing";

// ** `seq` for all sequences
export function generateJoinColumnOptions(
  tableName: string,
  joinColumnName: string,
  cardinality: "1_1" | "1_m" | "m_1" | "m_m",
) {
  return {
    name: joinColumnName,
    foreignKeyConstraintName: `${tableName}__${joinColumnName}__fkey__${cardinality}`,
  };
}

export function generateJoinTableOptions(
  junctionTableName: string,
  joinColumnName: string,
  inverseJoinColumnName: string,
) {
  return {
    name: junctionTableName,
    joinColumn: generateJoinColumnOptions(junctionTableName, joinColumnName, "m_1"),
    inverseJoinColumn: generateJoinColumnOptions(
      junctionTableName,
      inverseJoinColumnName,
      "m_1",
    ),
  };
}

export function getTableNameFromEntityClass<Entity extends ObjectLiteral>(
  entity: EntityTarget<Entity>,
): Hopefully<string> {
  return getMetadataArgsStorage().tables.find((table) => table.target === entity)?.name;
}
