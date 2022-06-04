<script>
//@ts-check
import gql from 'graphql-tag'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import SearchInput from '@/components/SearchInput.vue'
const take = 25;

export default {
  components :{
    SearchInput,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  data () {
    return {
        // Initialize your apollo data
        events: [],
        columns: ['Event Id', 'Extrinsic','Section','Method'],
        skip:0,
        page: 0,
        showMoreEnabled: true,
      }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    events: {
      query: gql`query ($skip:Int!,$take:Int!){
      events(skip: $skip,take:$take){
        eventIndex
        blockNum
        extrinsicIndex
        method
        section
      }
      }`,
      variables: {
        skip: 0,
        take,
      }

    },

  },
  methods: {
    update (previous) {
      this.skip= this.page*take;
      // Fetch more data and transform the original result
      this.$apollo.queries.extrinsics.fetchMore({
        // New variables
        variables: {
          skip: this.skip,
          take,
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {

          if(fetchMoreResult.extrinsics.length==0){
            previous? this.page++ : this.page--;
            return {
              ...previousResult,
            }
          }else{
            return {
              ...fetchMoreResult,
            }
          }
          
        },
      })
    },
    showNext () {
      this.page++;
      this.update(false);
      
    },
    showPrevious () {
      this.page--;
      if(this.page<0) this.page = 0;
      this.update(true);
    }
  },
}


</script>

<template>
<div class="bg-amber-100 shadow-md rounded-b-lg  ">
<div class="pt-4 pb-2 mb-2 bg-amber-100 sm:container sm:mx-auto items-center justify-center">
        <SearchInput/>
      </div>
</div>
  <div class=" bg-gray-50  min-h-full">
    <div
      class="sm:container sm:mx-auto items-center justify-center py-2 px-1">

      <div class="bg-white rounded-lg shadow-md">

        <header class=" md:flex justify-between mb-1 p-3">
          <div class="mb-2 md:mb-0 text-xl">
            <p>All Events</p>

          </div>
          
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a @click="showPrevious" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </a>
              <a  @click="showNext" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
          
        </header>
        <div>
          <table id="tableData" :rows="rows" class=" table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th v-for="col in columns" :key="col.id" class="text-center py-2 ">
                    {{col}}
                  </th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="event in events" :key="event.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 truncate overflow:elipsis">
                <td class="text-center">
                <router-link class="text-blue-500 hover:underline"  :to="{ name: 'event', params: { blockNum: event.blockNum, eventIndex: event.eventIndex }}" >{{event.blockNum}}-{{event.eventIndex}}</router-link>
            
                </td>
                <td class="text-center">
                <router-link class="text-blue-500 hover:underline"  :to="{ name: 'extrinsic', params: { blockNum: event.blockNum, extrinsicIndex: event.extrinsicIndex }}" >{{event.blockNum}}-{{event.extrinsicIndex}}</router-link>
            
                </td>
                <td class=" truncate px-3 py-3 text-center truncate">
                    {{event.section}}
                </td>
                <td class="truncate text-center px-3">
                    {{event.method}}
                </td>

            </tr>
            </tbody>
          </table>
        </div>
        <footer></footer>

        <!-- <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
        >
          {{ $route.meta.title }}
        </h2> -->
      </div>
    </div>
      
  </div>
</template>