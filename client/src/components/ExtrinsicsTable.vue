<script>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline'
import commonjs from '../commons.js'

export default {
 mixins:[commonjs],
 props: ['extrinsics'],
 components: {
    CheckCircleIcon, 
    XCircleIcon
 },
 data () {
    return {
        // Initialize your apollo data
        //extrinsics: [],
        columns: ['Id', 'Hash', 'Section','Method','Success'],
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
    <tr v-for="extrinsic in extrinsics" :key="extrinsic.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 truncate overflow:elipsis">
        <td class="text-center">
            <router-link class="text-blue-500 hover:underline"  :to="{ name: 'extrinsic', params: { blockNum: extrinsic.blockNum, extrinsicIndex: extrinsic.extrinsicIndex }}" >{{extrinsic.blockNum}}-{{extrinsic.extrinsicIndex}}</router-link>
            
        </td>
        <td class=" truncate text-center">
            {{extrinsic.extrinsicHash}}
        </td>
        <td class=" truncate px-3 py-3 text-center truncate">
            {{extrinsic.section}}
        </td>
        <td class="truncate text-center px-3">
            {{extrinsic.method}}
        </td>
        <td v-if="extrinsic.success==false" class="  text-center">
                  
            <XCircleIcon class="h-10 w-6 block m-auto text-red-500" aria-hidden="true" />
        </td>
        <td v-else="extrinsic.success==true" class="text-center align-center">
            <CheckCircleIcon class="h-10 w-6 block m-auto text-green-500" aria-hidden="true" />
        </td>

    </tr>
    </tbody>
</table>

</template>