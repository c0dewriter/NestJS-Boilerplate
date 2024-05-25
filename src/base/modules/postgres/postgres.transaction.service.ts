import { Injectable } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";

@Injectable()
export class PostgresTransactionService {
  constructor(private dataSource: DataSource) {}

  /**
   * This method is a helper for using typeorm transaction method.
   * You should provide a callback function for using transactionEntityManager.
   * Every data you return in cb will be returned by the startTransaction itself so
   * you can have output from transaction process. YOUR WELCOME!
   * @param cb the callback 'function'
   * @returns
   */
  async startTransaction<T>(
    cb: (transactionEntityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    let transactionCbReturnedData: unknown;

    await this.dataSource.transaction(async (transactionEntityManager) => {
      transactionCbReturnedData = await cb(transactionEntityManager);
    });

    return transactionCbReturnedData as T;
  }

  /**
   *
   * @returns the `EntityManager` of this connection
   */
  getEntityManager(): EntityManager {
    return this.dataSource.manager;
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }

  /**
   * If you provide an em to this function, your em will be used
   * as main EntityManger for queries otherwise a new transaction
   * will start.
   * @param em
   */
  async useTransactionOrStart<T>(
    em: EntityManager | undefined,
    cb: (transactionEntityManager: EntityManager) => Promise<T>,
  ): Promise<T> {
    if (em) {
      return cb(em);
    }

    return this.startTransaction(cb);
  }
}
