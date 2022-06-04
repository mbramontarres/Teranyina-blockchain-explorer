<script>
//@ts-check
import gql from 'graphql-tag'

import SearchInput from '@/components/SearchInput.vue'
import commonjs from '../commons.js'
import { BigNumber } from 'bignumber.js'
import Jazzicon from 'vue3-jazzicon/src/components';
import LastTransfersChart from '@/components/charts/LastTransfersChart.vue';



export default {
  mixins: [commonjs],
  components: {
    SearchInput,
    LastTransfersChart,
    [Jazzicon.name]: Jazzicon,
},
  
  data () {
    return {
        // Initialize your apollo data
        blocks: [],
        transfers: [],
        columns: ['Block', 'Status', 'Date','Hash','Extrinsics','Events','Author'],
      }
  },
  
  apollo: {
    // Simple query that will update the 'hello' vue property

      blocks: {
            query: gql`query  {
            blocks(skip:0,take:10){
              blockNum
              blockTimestamp
              extrinsicsCount
              eventCount
              blockAuthor
            }
            }`,

    },
  
    transfers:{
      query: gql`query{
      transfers(skip:0,take:10) {
        hash
        blockTimestamp
        source
        destination
        amount
      }
      }`
    },
    transfersCount:{
      query: gql`query{
        transfersCount
      }`

    },
    blocksCount:{
      query: gql`query{
        blocksCount
      }`

    },
    accountsCount:{
      query: gql`query{
        accountsCount
      }`

    },
    extrinsicsCount:{
      query: gql`query{
        extrinsicsCount
      }`

    },
    eventsCount:{
      query: gql`query{
        eventsCount
      }`

    }

  },
}
</script>

<template>
<div class="bg-amber-100">
    <div
      class=" mx-auto items-center justify-center  max-w-screen-xl px-1 py-12 sm:px-2 lg:items-center lg:justify-between   lg:py-16 lg:px-5"
    >
      <h2
        class="text-3xl mr-20 font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
      >
        Teranyina Blockchain Explorer
  
      </h2>
      <div class="mt-4">
        <SearchInput/>
      </div>
    </div>
      
      



  </div>
  <div class="bg-gray-50">

    <div class="container p-12 pt-1">
      
          
          
          

          <div class="shadow-lg bg-white rounded my-12 border border-1 border-slate-300 w-120">
              <div class="flex flex-wrap md:flex-row flex-col p-4 items-start"> 
                <div class="flex-auto flex-col "><b>Blocks</b>
                  <div>{{blocksCount}}</div>
                </div>
                <div class="flex-auto flex-col"><b>Transfers</b>
                <div>{{transfersCount}}</div></div>
                <div class="flex flex-auto  flex-col"><b>Num. Accounts</b>
                <div>{{accountsCount}}</div></div>
                <div class="flex flex-auto flex-col "><b>Extrinsics</b>
                <div>{{extrinsicsCount}}</div></div>
                <div class="flex flex-auto flex-col"><b>Events</b>
                <div>{{eventsCount}}</div></div>           
              </div>
          </div>
          <LastTransfersChart/>

          <div class="block bg-white lg:flex lg:justify-between  lg:flex-wrap my-3 w-full"> 
            <div class=" w-full lg:w-1/2 rounded shadow-md  h-100 border border-1 border-slate-300"> 
              <header class="p-3 border-b border-b-1 border-slate-300">
                Transactions
              </header>
              <div class="overflow-auto h-96 flex-col p-2">
                <div v-for="transfer in transfers" class="w-full">
                  <div class="row py-2">
                    <div class="md:flex block w-full">
                      <div class="flex  mr-4 mb-1 md:w-1/3  w-full truncate">
                        <span class="inline-block px-4 py-2.5 bg-gray-200 text-gray-700 rounded mr-2 md:block hidden"><span class="text-dark">Tx</span></span>
                        <div class =" text-sm truncate inline-block w-full">
                          <span class=" inline-block md:hidden pr-1"><b>Txn</b> </span>
                          <router-link  :to='"/transfer/" + transfer.hash' ><p class="text-blue-500 hover:underline truncate">{{transfer.hash}}</p></router-link>
                          <span class="sm:block  text-slate-500 ml-1 sm:ml-0 text-nowrap text-xs"> {{dateFromNow(transfer.blockTimestamp)}} ago</span>
                        </div>
                      </div>

                      <div class="sm:flex block justify-between md:w-2/3 w-full">
                        <div class="text-sm truncate w-1/2">
                          <span v-if="transfer.source!=''"><b>From</b>  <router-link class="flex truncate" :to='"/account/" + transfer.source' >
                        <jazzicon  :address='"0x"+transfer.source' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{transfer.source}}</div></router-link></span>
                          <span class="block truncate"><b>To</b>  <router-link class="flex truncate" :to='"/account/" + transfer.destination' >
                        <jazzicon :address='"0x"+transfer.destination' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{transfer.destination}}</div></router-link></span>
                        </div>

                        <div class="sm:block">
                          <span class="text-sm " data-toggle="tooltip" title="" data-original-title="Block Reward">{{formatAmount(transfer.amount)}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="w-full">
                </div>
              </div>
              <footer class="p-3 border-t border-t-1 border-slate-300">
                
                  <router-link to='/txns' ><button class="bg-amber-500 rounded items-center w-full text-white opacity-80 hover:opacity-100 hover:shadow-lg transition duration-300 ease-in-out">View Txns</button></router-link>
              </footer>
            </div>


            <div class=" w-full bg-white lg:w-1/2 rounded shadow-md  h-100 border border-1 border-slate-300"> 
              <header class="p-3 border-b border-b-1 border-slate-300">
                Blocks
              </header>
              <div class="overflow-auto h-96 flex-col p-2">
                <div v-for="block in blocks" class="w-full ">
                  <div class="row py-2">
                    <div class="md:flex block w-full">
                      <div class="flex mr-4 mb-1 sm:w-1/3">
                        <span class="inline-block px-4 py-2.5 bg-gray-200 text-gray-700 rounded mr-2 md:block hidden"><span class="text-dark">Bk</span></span>
                        <div class =" text-sm flex-1">
                          <span class="inline-block md:hidden pr-1"><b>Block</b> </span>
                          <router-link  :to='"/block/" + block.blockNum' ><p class="text-blue-500 hover:underline truncate">{{block.blockNum}}</p></router-link>
                          <span class="sm:block  text-slate-500 ml-1 sm:ml-0 text-nowrap text-xs">{{dateFromNow(block.blockTimestamp)}} ago</span>
                        </div>
                      </div>

                      <div class="flex justify-between sm:w-2/3">
                        <div class="block text-sm truncate pr-10">
                          <span class="block mb-1 sm:mb-0 truncate"><b class ="mr-2">Author</b>
                            <router-link class="flex truncate" :to='"/account/" + block.blockAuthor' >
                              <jazzicon :address='"0x"+block.blockAuthor' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{block.blockAuthor}}</div></router-link></span>
                            <a class="text-xs" href="/txs?block=14543878" data-toggle="tooltip" title="" data-original-title="Transactions in this Block">{{block.extrinsicsCount}} ext </a>
                            <a class="text-xs pl-4" href="/txs?block=14543878" data-toggle="tooltip" title="" data-original-title="Transactions in this Block">{{block.eventCount}} events </a>
                        </div>

                        <!-- <div class="sm:block">
                          <span class="text-sm " data-toggle="tooltip" title="" data-original-title="Block Reward">2<b>.</b>01105 Eth</span>
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <hr class="w-full ">
                </div>
              </div>
              <footer class="p-3 border-t border-t-1 border-slate-300">
                
                <router-link to='/blocks'><button class="bg-amber-500 rounded items-center w-full text-white opacity-80 hover:opacity-100 hover:shadow-lg transition duration-300 ease-in-out">View Blocks</button></router-link>
                
              </footer>
            </div>
          </div>
    </div>

    
  </div>
</template>
