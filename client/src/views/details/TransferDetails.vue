<script>
//@ts-check
import gql from 'graphql-tag'
import ExtrinsicsTable from '@/components/ExtrinsicsTable.vue'
import EventsTable from '@/components/EventsTable.vue'
import commonjs from '../../commons.js'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline'
import Jazzicon from 'vue3-jazzicon/src/components';
export default {
  mixins: [commonjs],
  components: {
    ExtrinsicsTable,
    EventsTable,
    CheckCircleIcon,
    XCircleIcon,
    [Jazzicon.name]: Jazzicon
    },
  data () {
    return {
        // Initialize your apollo data
        transfer: [],
        events: [],
        openTab: 1,
      }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    transfer: {
      query: gql`query transfer ($hash: String!){
        transfer(hash: $hash)
        {
            blockNum
            hash
            source
            destination
            amount
            fee
            success
            method
            events {
                blockNum
                extrinsicIndex
                eventIndex
                section
                method
            }
        }
      }`,
      variables () {
      return {
        hash: this.$route.params.hash,
      }
    },
    },

  },
}

</script>


<template>

    <div class=" bg-gray-50  min-h-full">
        <div
        class="sm:container sm:mx-auto items-center justify-center py-2 px-1">
            <div class="text-xl">
            <b>Transfer:</b><br>
            <div class="truncate">
            {{ this.$route.params.hash }}
            </div>
            
            </div>
            <div class="bg-white rounded-lg shadow-md px-2 py-1 mt-4">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Hash</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        {{transfer.hash}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Block</b>
                    </div>
                    <div class="w-2/3 px-2">
                        <router-link class="text-blue-500 hover:underline" :to='"/block/" + transfer.blockNum' >{{transfer.blockNum}}</router-link>
                    </div>
                </div>
                <hr class="w-full">
                <div v-if="transfer.source!=''" class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Source</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        <router-link class="flex truncate" :to='"/account/" + transfer.source' >
                        <jazzicon :address='"0x"+transfer.source' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{transfer.source}}</div></router-link>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Destination</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                         <router-link class="flex truncate" :to='"/account/" + transfer.destination' >
                        <jazzicon :address='"0x"+transfer.destination' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{transfer.destination}}</div></router-link>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Amount</b>
                    </div>
                    <div class="w-2/3 px-2">
                         {{formatAmount(transfer.amount)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Fee</b>
                    </div>
                    <div class="w-2/3 px-2" >
                         {{formatAmount(transfer.fee)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Success</b>
                    </div>
                    <div class="w-2/3 px-2">
                     <div v-if="transfer.success==false" class="w-2/3">
                        <XCircleIcon class="h-10 w-6 block text-red-500" aria-hidden="true" />
                     </div>
                     <div v-else="transfer.success==true" class="w-2/3">
                            <CheckCircleIcon class="h-10 w-6 block  text-green-500" aria-hidden="true" />
                     </div>
                    </div>
                </div>

            </div>
            <div class="bg-white rounded-lg shadow-md  mt-4">
                <div class="w-full">
                    <ul class="flex mb-0 list-none flex-wrap  flex-row">
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                        <a class="border border-1 border-slate-300 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-t-lg block leading-normal w-full" v-on:click="toggleTabs(1)" v-bind:class="{'text-orange-600 bg-white': openTab !== 1, 'text-white bg-orange-600': openTab === 1}">
                            Events
                        </a>
                        </li>
                    </ul>
                    <hr class="bg-orange-600">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="px-1 py-1 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                                <EventsTable :events=transfer.events />
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
            
        </div>
        
    </div>
</template>