<script>
export default {
 props: ['events'],
 data () {
    return {
        // Initialize your apollo data
        //extrinsics: [],
        columns: ['Id', 'Extrinsic', 'Section','Method'],
      }
  },
}

  
</script>



<template>
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

</template>