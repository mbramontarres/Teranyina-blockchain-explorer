<script>
//@ts-check
import gql from 'graphql-tag'
import ExtrinsicsTable from '@/components/ExtrinsicsTable.vue'
import EventsTable from '@/components/EventsTable.vue'


export default {
  components: {
    ExtrinsicsTable,
    EventsTable
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
    event: {
      query: gql`query extrinsic ($blockNum: Float!, $eventIndex:Float!){
        event(blockNum: $blockNum, eventIndex: $eventIndex)
        {
            blockNum
            extrinsicIndex
            method
            section
            doc
            data
            phase
        }
      }`,
      variables () {
      return {
        blockNum: parseFloat(this.$route.params.blockNum),
        eventIndex: parseFloat(this.$route.params.eventIndex),
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
            <b>Event:</b>
            {{ this.$route.params.blockNum }}-{{ this.$route.params.eventIndex }}
            
            </div>
            <div class="bg-white rounded-lg shadow-md px-2 py-1 mt-4">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Block Number</b>
                    </div>
                    <div class="w-2/3 truncate">
                        <router-link class="text-blue-500 hover:underline" :to='"/block/" + event.blockNum' >{{event.blockNum}}</router-link>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Extrinsic</b>
                    </div>
                    <div class="w-2/3">
                       <router-link class="text-blue-500 hover:underline"  :to="{ name: 'extrinsic', params: { blockNum: event.blockNum, extrinsicIndex: event.extrinsicIndex }}" >{{event.blockNum}}-{{event.extrinsicIndex}}</router-link>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Section</b>
                    </div>
                    <div class="w-2/3 truncate">
                         {{event.section}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Method</b>
                    </div>
                    <div class="w-2/3 truncate">
                        {{event.method}}
                    </div>
                </div>
                <hr class="w-full">
                <div class=" h-90 flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Docs</b>
                    </div>
                    <textarea readonly class=" h-48 border-none w-2/3" >
                        {{JSON.parse(event.doc).join("\n")}}
                    </textarea>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Phase</b>
                    </div>
                    <div class="w-2/3 truncate">
                        {{event.phase}}
                    </div>
                </div>

                <hr class="w-full">
                <div class=" h-90 flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Data</b>
                    </div>
                    <textarea readonly class=" h-64 w-2/3  px-2 block">
                        {{JSON.parse(event.data)}}
                    </textarea>
                </div>

            </div>
            
        </div>
        
    </div>
</template>