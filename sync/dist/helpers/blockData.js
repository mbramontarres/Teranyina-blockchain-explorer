"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processBlockData = exports.addTransfer = exports.addOrReplaceAccount = exports.getAccountProperies = void 0;
const extrinsic_dto_1 = require("../../src/extrinsic/dto/extrinsic.dto");
const extrinsic_schema_1 = require("../../src/extrinsic/extrinsic.schema");
const event_schema_1 = require("../../src/event/event.schema");
const event_dto_1 = require("../../src/event/dto/event.dto");
const transfer_schema_1 = require("../../src/transfer/transfer.schema");
const transfer_dto_1 = require("../../src/transfer/dto/transfer.dto");
const account_schema_1 = require("../../src/account/account.schema");
const account_dto_1 = require("../../src/account/dto/account.dto");
const getAccountProperies = async (api, account) => {
    const acc = new account_dto_1.AccountType;
    const balance = await api.derive.balances.all(account);
    acc.accountId = balance.accountId.toHuman();
    acc.availableBalance = balance.availableBalance.toString();
    acc.freeBalance = balance.freeBalance.toString();
    acc.lockedBalance = balance.lockedBalance.toString();
    acc.reservedBalance = balance.reservedBalance.toString();
    acc.totalBalance = balance.freeBalance.add(balance.reservedBalance).toString();
    acc.nonce = balance.accountNonce.toNumber();
    return acc;
};
exports.getAccountProperies = getAccountProperies;
const addOrReplaceAccount = async (api, account, db, updateAccounts) => {
    const Addressmodel = db.model('accounts', account_schema_1.AccountSchema);
    const acc = await (0, exports.getAccountProperies)(api, account);
    if (updateAccounts) {
        await Addressmodel.updateOne({ accountId: acc.accountId.toString() }, acc, { upsert: true });
    }
    else {
        await Addressmodel.updateOne({ accountId: acc.accountId.toString() }, { $setOnInsert: acc }, { upsert: true });
    }
};
exports.addOrReplaceAccount = addOrReplaceAccount;
const addTransfer = async (Transfermodel, extr, signer, feeInfo, allevents) => {
    const transfer = new transfer_dto_1.TransferType;
    transfer.blockNum = extr.blockNum;
    transfer.blockTimestamp = extr.blockTimestamp;
    transfer.section = extr.section;
    transfer.method = extr.method;
    transfer.hash = extr.extrinsicHash;
    transfer.events = extr.events;
    transfer.success = extr.success;
    transfer.source = signer;
    if (JSON.parse(extr.params)[0].id) {
        transfer.destination = JSON.parse(extr.params)[0].id;
    }
    else if (JSON.parse(extr.params)[0].address20) {
        transfer.destination = JSON.parse(extr.params)[0].address20;
    }
    else {
        transfer.destination = JSON.parse(extr.params)[0];
    }
    if (extr.method === 'transferAll' && extr.success) {
        const eventsfind = await allevents.find(({ event }) => event.section === 'balances' &&
            event.method === 'Transfer');
        transfer.amount = JSON.parse(eventsfind.event.data[2].toString());
    }
    else if (extr.method === 'transferAll' && !extr.success) {
        transfer.amount = 0;
    }
    else if (extr.method === 'forceTransfer') {
        transfer.amount = JSON.parse(extr.params)[2];
    }
    else {
        transfer.amount = JSON.parse(extr.params)[1];
    }
    let info = await feeInfo;
    transfer.fee = !!await feeInfo ? info.toJSON().partialFee : 0;
    await Transfermodel.updateOne({ hash: transfer.hash }, transfer, { upsert: true });
};
exports.addTransfer = addTransfer;
const processBlockData = async (api, db, extrinsics, allevents, blockNum, blockHash, block, timestamp, updateAccount) => {
    const Transfermodel = db.model('transfers', transfer_schema_1.TransferSchema);
    const Extmodel = db.model('extrinsics', extrinsic_schema_1.ExtrinsicSchema);
    const Eventmodel = db.model('events', event_schema_1.EventSchema);
    var i = 0;
    try {
        var index = 0;
        for (const extrinsic of extrinsics) {
            const extr = new extrinsic_dto_1.ExtrinsicType;
            extr.section = extrinsic.method.section;
            extr.blockTimestamp = timestamp;
            extr.method = extrinsic.method.method;
            extr.blockNum = blockNum;
            extr.doc = JSON.stringify(extrinsic.meta.docs.toJSON());
            extr.extrinsicHash = extrinsic.hash.toHex();
            extr.extrinsicIndex = index;
            extr.params = JSON.stringify(extrinsic.method.args);
            let feeInfo = null;
            if (extrinsic.isSigned) {
                feeInfo = api.rpc.payment.queryInfo(extrinsic.toHex(), blockHash);
            }
            const events = allevents.filter(({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index));
            const allaccounts = [];
            extr.events = [];
            for (const e of events) {
                const event = new event_dto_1.EventType;
                event.blockNum = blockNum;
                event.extrinsicIndex = extr.extrinsicIndex;
                event.eventIndex = i;
                event.section = e.event.section;
                event.method = e.event.method;
                event.phase = e.phase.toString();
                event.doc = JSON.stringify(e.event.meta.docs.toJSON());
                event.data = JSON.stringify(e.event.data);
                if (api.events.system.ExtrinsicSuccess.is(e.event)) {
                    extr.success = true;
                }
                else {
                    extr.success = false;
                }
                if (extr.section === 'balances') {
                    const types = e.event.typeDef;
                    e.event.data.forEach((d, i) => {
                        if (types[i].type === 'AccountId32') {
                            if (!allaccounts.includes(d.toString())) {
                                allaccounts.push(d.toString());
                            }
                        }
                    });
                }
                i++;
                const createdEvent = await Eventmodel.updateOne({ blockNum: event.blockNum, eventIndex: event.eventIndex }, { $setOnInsert: event }, { upsert: true });
                block.events.push(createdEvent.upsertedId);
                extr.events.push(createdEvent.upsertedId);
            }
            Promise.all(allaccounts.map((acc) => (0, exports.addOrReplaceAccount)(api, acc, db, updateAccount)));
            if (extr.section === 'balances' && (extr.method === 'forceTransfer' ||
                extr.method === 'transfer' ||
                extr.method === 'transferAll' ||
                extr.method === 'transferKeepAlive')) {
                const signer = extrinsic.isSigned ? extrinsic.signer.toString() : '';
                (0, exports.addTransfer)(Transfermodel, extr, signer, feeInfo, allevents);
            }
            const createdExtrinsic = await Extmodel.updateOne({ blockNum: extr.blockNum, extrinsicIndex: extr.extrinsicIndex }, { $setOnInsert: extr }, { upsert: true });
            block.extrinsics.push(createdExtrinsic.upsertedId);
            index++;
        }
    }
    catch (e) {
        console.log("Alguna cosa ha fallat al processar les dades d'un block.");
    }
};
exports.processBlockData = processBlockData;
//# sourceMappingURL=blockData.js.map