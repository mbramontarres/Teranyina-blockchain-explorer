# Teranyina-blockchain-explorer

\section*{Prerequisits}
Primerament, hem d'instal·lar els programaris Node.js, MongoDB i el compilador de TypeScript.

Els 2 primers es poden instal·lar a través de la seva pàgina web:

\begin{itemize}
    \item \textbf{Node.js:} \url{https://nodejs.org/en/download/}
    \item \textbf{MongDB:} \url{https://www.mongodb.com/try/download/community}
\end{itemize}

Un cop instal·lat Node.js, instal·lem TypeScript amb la següent comanda:
\begin{minted}{shell}
   npm install -g typescript
\end{minted}


\section*{Instal·lació del servidor}

Primerament, configurem el servidor:
\begin{itemize}
\item Ens posicionem a la carpeta \textbf{servidor}.
    \item Instal·lem les dependències del projecte:
   
    \begin{minted}{shell}
   npm install 
\end{minted}
    \item Configurem la connexió a la base de dades, modificant la línia \textit{mongoDBConstring}
del fitxer config.ts que es troba a la carpeta config.  Actualment el valor està predeterminat
a localhost/explorerdb.
\begin{minted} {TypeScript}
const config = {
substrateNetwork: 'teranyina',
wsProviderUrl: 'wss://rpc-teranyina.centreeasy.com',

mongoDBConstring: 'mongodb://localhost/explorerdb'
};

export default config;
    \end{minted}

     
\end{itemize}
 El nostre servidor es compon de l'API i el sincronitzador de dades.

\begin{itemize}
    \item \textbf{Sincronitzador de dades:} Per executar el sincronitzador de dades, primerament, hem de compilar amb la comanda: \textit{tsc}. A continuació, executem amb la comanda: \textit{node ./dist/sync/sync.js}
    
    
    \item \textbf{API:} Per executar i engegar la API necessitem executar una de les següents comandes:

    
    \begin{minted}{Javascript}
//development
$ npm run start

//watch mode
$ npm run start:dev

//production mode
$ npm run start:prod

\end{minted}



\end{itemize}



\section*{Instal·lació del client}

\begin{itemize}
\item En posicionem a la carpeta \textbf{client}.
    \item Instal·lem les dependències del projecte:
   
    \begin{minted}{shell}
   npm install 
\end{minted}

\item  Per executar el client, executarem una de les comandes següents:
        \begin{minted}{Javascript}
// start dev server
npm run dev

// build for production
npm run build

// locally preview production build
npm run serve

\end{minted}
\end{itemize}
