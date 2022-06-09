# Teranyina-blockchain-explorer
## Prerequisits

 Primerament, hem d'instal·lar els programaris Node.js, MongoDB i el
 compilador de TypeScript.

 Els 2 primers es poden instal·lar a través de la seva pàgina web:

 • **Node.js:** https://nodejs.org/en/download/

 • **MongDB:** https://www.mongodb.com/try/download/community

 Un cop instal·lat Node.js, instal·lem TypeScript amb la següent
comanda:

```bash
$  npm install -g typescript
```


 ## Instal·lació del servidor

Primerament, configurem el servidor:\
 • Ens posicionem a la carpeta **servidor**.

 • Instal·lem les dependències del projecte:
```bash
$ npm install
```
• Configurem la connexió a la base de dades, modificant la línia
 *mongoDB-Constring* del fitxer config.ts que es troba a la carpeta
 config. Actualment el valor està predeterminat a localhost/explorerdb.

```typescript
const config = {
substrateNetwork: 'teranyina',
wsProviderUrl: 'wss://rpc-teranyina.centreeasy.com',

mongoDBConstring: 'mongodb://localhost/explorerdb' };

export default config;
```

 El nostre servidor es compon de l'API i el sincronitzador de dades.

 • **Sincronitzador de dades:** Per executar el sincronitzador de
dades, primerament, hem de compilar amb la comanda: *tsc*. A
continuació, executem amb la comanda: *node ./dist/sync/sync.js*

• **API:** Per executar i engegar la API necessitem executar una de
 les següents comandes:
```bash
 # development
 $ npm run start

 # watch mode
 $ npm run start:dev

 # production mode
 $ npm run start:prod
```
 ## Instal·lació del client

 • En posicionem a la carpeta **client**.

 • Instal·lem les dependències del projecte:
```bash
 $ npm install
```
 • Per executar el client, executarem una de les comandes següents:
```bash
 # start dev server
 $ npm run dev

 # build for production
 $ npm run build

 # locally preview production build 
 $ npm run serve
 
 ```
