import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// ** =============================================================== ** //
// **                            UUID Mixes                           ** //
// ** =============================================================== ** //
export abstract class PrimaryUUIDMixin {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}

export abstract class UUIDTimeStampedMixin extends PrimaryUUIDMixin {
  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedDate: Date;
}

// ** =============================================================== ** //
// **                           Serial Mixes                          ** //
// ** =============================================================== ** //
export abstract class PrimaryIDMixin {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;
}

export abstract class TimeStampedMixin {
  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  updatedDate: Date;
}

export abstract class IDTimeStampedMixin extends TimeStampedMixin {
  @PrimaryGeneratedColumn("increment")
  id: number;
}

export abstract class IDTimeStampedSoftDeleteMixin extends IDTimeStampedMixin {
  @DeleteDateColumn({ type: "timestamptz", nullable: true })
  deletedDate?: Date;
}
