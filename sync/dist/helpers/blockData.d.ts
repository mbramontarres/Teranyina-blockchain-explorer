import { ApiPromise } from "@polkadot/api";
import { EventRecord } from '@polkadot/types/interfaces';
import { AccountType } from "../../src/account/dto/account.dto";
export declare const getAccountProperies: (api: ApiPromise, account: string) => Promise<AccountType>;
export declare const addOrReplaceAccount: (api: ApiPromise, account: string, db: any, updateAccounts: boolean) => Promise<void>;
export declare const addTransfer: (Transfermodel: any, extr: any, signer: any, feeInfo: any, allevents: EventRecord[]) => Promise<void>;
export declare const processBlockData: (api: ApiPromise, db: any, extrinsics: any, allevents: any, blockNum: any, blockHash: any, block: any, timestamp: any, updateAccount: boolean) => Promise<void>;
