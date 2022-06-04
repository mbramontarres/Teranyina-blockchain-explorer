"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@polkadot/api");
const util_crypto_1 = require("@polkadot/util-crypto");
const mongoose_1 = require("mongoose");
const block_dto_1 = require("../src/block/dto/block.dto");
const block_schema_1 = require("../src/block/block.schema");
const config_1 = require("../config/config");
const searchGaps_1 = require("./helpers/searchGaps");
const blockData_1 = require("./helpers/blockData");
async function Run() {
    const wsProvider = new api_1.WsProvider(config_1.default.wsProviderUrl);
    const api = await api_1.ApiPromise.create({ provider: wsProvider });
    const db = await mongoose_1.default.connect(config_1.default.mongoDBConstring);
    mongoose_1.default.connection
        .once("open", () => console.log("Connected to Database"))
        .on("error", error => {
        console.log("Couldn't connect to MongoDb Database", error);
    });
    Promise.all([findGaps(db, api), processAllAccounts(db, api), listenBlocks(db, api)]);
}
async function listenBlocks(db, api) {
    console.log("Listener Thread Started");
    const chain = await api.rpc.system.chain();
    await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
        console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
        await addBlocksDb(db, api, lastHeader.number.toNumber(), true);
        const finalizedHash = await api.rpc.chain.getFinalizedHead();
        await processFinalized(api, db, finalizedHash);
    });
}
async function processFinalized(api, db, finalizedHash) {
    const Blockmodel = db.model('blocks', block_schema_1.BlockSchema);
    const finalizedBlock = await api.rpc.chain.getBlock(finalizedHash);
    const tofinalize = await Blockmodel.find({ blockNum: { $lte: finalizedBlock.block.header.number.toNumber() }, finalized: false });
    for (const f of tofinalize) {
        const blockHash = await api.rpc.chain.getBlockHash(f.blockNum);
        const extendedBlock = await api.derive.chain.getHeader(blockHash);
        const parentHash = extendedBlock.parentHash;
        const extrinsicsRoot = extendedBlock.extrinsicsRoot;
        const blockAuthor = f.blockNum == 0 ? '' : extendedBlock.author.toString();
        const stateRoot = extendedBlock.stateRoot;
        await Blockmodel.updateOne({ blockNum: f.blockNum }, { blockHash: blockHash, blockAuthor: blockAuthor, extrinsicsRoot: extrinsicsRoot.toHex(), parentHash: parentHash.toHex(), stateRoot: stateRoot.toHex(), finalized: true });
    }
    console.log("Últim Block finalitzat: " + finalizedBlock.block.header.number.toNumber());
}
async function processAllAccounts(db, api) {
    console.log("Accounts Thread Started");
    let limit = 50;
    let last_key = "";
    let query = await api.query.system.account.entriesPaged({ args: [], pageSize: limit, startKey: last_key });
    while (query.length != 0) {
        for (const account of query) {
            let account_id = (0, util_crypto_1.encodeAddress)(account[0].slice(-32));
            await (0, blockData_1.addOrReplaceAccount)(api, account_id, db, false);
            last_key = account[0];
        }
        query = await api.query.system.account.entriesPaged({ args: [], pageSize: limit, startKey: last_key });
    }
    console.log("Accounts afegides");
}
async function findGaps(db, api) {
    console.log("Gaps Thread Started");
    const lastHeader = await api.rpc.chain.getHeader();
    const gaps = await (0, searchGaps_1.searchGaps)(lastHeader.number.toNumber(), db, block_schema_1.BlockSchema);
    for (const gap of gaps) {
        let block = gap.l;
        while (block <= gap.r) {
            await addBlocksDb(db, api, block, false);
            block++;
        }
        console.log("Gaps Thread Started:Gap afegit");
    }
}
async function addBlocksDb(db, api, blockNum, updateAccount) {
    const Blockmodel = db.model('blocks', block_schema_1.BlockSchema);
    const block = new block_dto_1.BlockType;
    const blockHash = await api.rpc.chain.getBlockHash(blockNum);
    const CurrentBlock = await api.rpc.chain.getBlock(blockHash);
    const extendedBlock = await api.derive.chain.getBlock(blockHash);
    const runtime = await api.rpc.state.getRuntimeVersion(blockHash);
    const timestamp = blockNum !== 0 ? parseInt(extendedBlock.block.extrinsics.find(({ method: { section, method } }) => section === 'timestamp' && method === 'set').args[0].toString(), 10) : 0;
    block.blockHash = blockHash.toHex();
    block.blockNum = blockNum;
    block.parentHash = CurrentBlock.block.header.parentHash.toHex();
    block.extrinsicsRoot = CurrentBlock.block.header.extrinsicsRoot.toHex();
    block.stateRoot = CurrentBlock.block.header.stateRoot.toHex();
    block.blockAuthor = extendedBlock.author ? extendedBlock.author.toString() : "";
    block.extrinsicsCount = extendedBlock.extrinsics.length;
    block.eventCount = extendedBlock.events.length;
    block.specVersion = runtime.specVersion.toNumber();
    block.finalized = false;
    block.blockTimestamp = timestamp;
    const allevents = extendedBlock.events;
    let extrinsics = extendedBlock.block.extrinsics;
    block.extrinsics = [];
    block.events = [];
    await (0, blockData_1.processBlockData)(api, db, extrinsics, allevents, blockNum, blockHash, block, timestamp, updateAccount);
    await Blockmodel.updateOne({ blockNum: block.blockNum }, { $setOnInsert: block }, { upsert: true });
    console.log("Block: " + blockNum + " added");
}
Run();
//# sourceMappingURL=sync.js.map