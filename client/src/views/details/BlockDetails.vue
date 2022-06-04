<script>
//@ts-check
import gql from 'graphql-tag'
import ExtrinsicsTable from '@/components/ExtrinsicsTable.vue'
import EventsTable from '@/components/EventsTable.vue'
import NotFound from '../NotFound.vue'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline'
import commonjs from '../../commons.js'
import Jazzicon from 'vue3-jazzicon/src/components';
export default {
  mixins: [commonjs],
  components: {
    ExtrinsicsTable,
    EventsTable,
    NotFound,
    CheckCircleIcon, 
    XCircleIcon,
    [Jazzicon.name]: Jazzicon
    },
  data () {
    return {
        // Initialize your apollo data
        block: [],
        extrinsics: [],
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
    block: {
      query: gql`query block ($blockNum: Float!){
        block(blockNum: $blockNum){
            blockTimestamp
            finalized
            blockHash
            parentHash
            stateRoot
            extrinsicsRoot
            blockAuthor
            specVersion
            extrinsics{
              blockNum
              extrinsicIndex
              section
              method
              success
              extrinsicHash
            }
            events{
              blockNum
              eventIndex
              extrinsicIndex
			  section
              method 
            }
        }
      }`,
      variables () {
            return {
                blockNum: parseFloat(this.$route.params.numBlock),
            }
        },
    result({data}) {
         this.block =   data.block;
         
        },
    
    },

  },
}

</script>


<template>
    
    <div v-if="block==null"><NotFound/></div>
    <div v-else  class=" bg-gray-50  min-h-full">
        <div
        class="sm:container sm:mx-auto items-center justify-center py-2 px-1">
            <div class="text-xl">
            Block#{{ this.$route.params.numBlock }}
            </div>
            <div class="bg-white rounded-lg shadow-md px-2 py-1 mt-4">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Timestamp</b>
                    </div>
                    <div class="w-2/3 px-2">
                        {{dateFromNow(block.blockTimestamp)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Status</b>
                    </div>
                    <div v-if="block.finalized==false" class="w-2/3 px-2">
                  
                    <XCircleIcon class="h-10 w-6 block text-red-500" aria-hidden="true" />
                    </div>
                    <div v-else="block.finalized==true" class="w-2/3 px-2">
                        <CheckCircleIcon class="h-10 w-6 block  text-green-500" aria-hidden="true" />
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2 ">Hash</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        {{block.blockHash}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Parent Hash</b>
                    </div>
                    <div class="w-2/3 px-2 truncate ">
                         {{block.parentHash}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">State Root</b>
                    </div>
                    <div class="w-2/3 px-2 truncate ">
                         {{block.stateRoot}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Extrinsics Root</b>
                    </div>
                    <div class="w-2/3 px-2 truncate ">
                         {{block.extrinsicsRoot}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Author</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        <router-link class="flex truncate" :to='"/account/" + block.blockAuthor' >
                  <jazzicon :address='"0x"+block.blockAuthor' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{block.blockAuthor}}</div></router-link>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Spec Version</b>
                    </div>
                    <div class="w-2/3 px-2">
                         {{block.specVersion}}
                    </div>
                </div>

            </div>

            <div class="bg-white rounded-lg shadow-md  mt-4">
                <div class="w-full">
                    <ul class="flex mb-0 list-none flex-wrap  flex-row">
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                        <a class="border border-1 border-slate-300 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-t-lg block leading-normal w-full" v-on:click="toggleTabs(1)" v-bind:class="{'text-orange-600 bg-white': openTab !== 1, 'text-white bg-orange-600': openTab === 1}">
                            Extrinsics
                        </a>
                        </li>
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a class="border border-1 border-slate-300 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-t-lg block leading-normal" v-on:click="toggleTabs(2)" v-bind:class="{'text-orange-600 bg-white': openTab !== 2, 'text-white bg-orange-600': openTab === 2}">
                            Events
                        </a>
                        </li>

                    </ul>
                    <hr class="bg-orange-600">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="px-1 py-1 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                                <ExtrinsicsTable :extrinsics=block.extrinsics />
                            </div>
                            <div v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                                <EventsTable :events=block.events />
                            </div>
                            <div v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                            <p>
                                Efficiently unleash cross-media information without
                                cross-media value. Quickly maximize timely deliverables for
                                real-time schemas.
                                <br />
                                <br />
                                Dramatically maintain clicks-and-mortar solutions
                                without functional solutions.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
        </div>
    </div>
</template>