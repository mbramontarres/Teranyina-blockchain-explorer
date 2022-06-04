<script>
//@ts-check
import gql from 'graphql-tag'
import ExtrinsicsTable from '@/components/ExtrinsicsTable.vue'
import EventsTable from '@/components/EventsTable.vue'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline'

export default {
    components: {
        EventsTable,
        CheckCircleIcon, 
        XCircleIcon
    },
  data () {
    return {
        // Initialize your apollo data
        extrinsic: [],
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
    extrinsic: {
      query: gql`query extrinsic ($blockNum: Float!, $extrinsicIndex:Float!){
        extrinsic(blockNum: $blockNum, extrinsicIndex: $extrinsicIndex)
        {
            blockNum
            extrinsicHash
            success
            method
            doc
            params
            section
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
        blockNum: parseFloat(this.$route.params.blockNum),
        extrinsicIndex: parseFloat(this.$route.params.extrinsicIndex),
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
            <b>Extrinsic:</b>
            {{ this.$route.params.blockNum }}-{{ this.$route.params.extrinsicIndex }}
            
            </div>
            <div class="bg-white rounded-lg truncate shadow-md px-2 py-1 mt-4">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Block Number</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        <router-link class="text-blue-500 hover:underline" :to='"/block/" + extrinsic.blockNum' >{{extrinsic.blockNum}}</router-link>
                    </div>
                </div>
                <hr class="w-full ">
                <div class="flex flex-col truncate md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Hash</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        <p>{{extrinsic.extrinsicHash}}</p>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row truncate py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Method</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                        {{extrinsic.method}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Section</b>
                    </div>
                    <div class="w-2/3 px-2 truncate">
                         {{extrinsic.section}}
                    </div>
                </div>
                <hr class="w-full">
                <div class=" h-90 flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Params</b>
                    </div>
                    <textarea readonly class=" h-64 w-2/3  px-2 block">
                        {{JSON.parse(extrinsic.params)}}
                    </textarea>
                </div>
                <hr class="w-full">
                <div class=" h-90 flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Docs</b>
                    </div>
                    <textarea readonly class=" h-48 border-none w-2/3" >
                        {{JSON.parse(extrinsic.doc).join("\n")}}
                    </textarea>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Success</b>
                    </div>
                    <div class="w-2/3 px-2">
                         <div v-if="extrinsic.success==false" class="w-2/3">
                  
                    <XCircleIcon class="h-10 w-6 block text-red-500" aria-hidden="true" />
                    </div>
                    <div v-else="extrinsic.success==true" class="w-2/3">
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
                                <EventsTable :events=extrinsic.events />
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    </div>

            </div>
            
        </div>
        
    </div>
</template>