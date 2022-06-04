<script>

import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline'
import commonjs from '../commons.js'
import Jazzicon from 'vue3-jazzicon/src/components';

export default {
 mixins:[commonjs],
 props: ['transfers'],
 components: {
    CheckCircleIcon, 
    XCircleIcon,
    [Jazzicon.name]: Jazzicon
 },
 data () {
    return {
        // Initialize your apollo data
        //extrinsics: [],
        columns: ['Hash','Block','Source', 'Destination', 'Amount','Status'],
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
    <tr v-for="transfer in transfers" :key="transfer.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 truncate overflow:elipsis">
        <td class=" truncate pl-5 text-center">
            <router-link  class="text-blue-500 hover:underline" :to='"/transfer/" + transfer.hash' >{{transfer.hash}}</router-link>
            
        </td>
        <td class=" truncate text-center">
            <router-link class="text-blue-500 hover:underline"  :to='"/block/" + transfer.blockNum' >{{transfer.blockNum}}</router-link>
            
        </td>
        <td class="px-3 py-3 truncate">
                  <router-link class="flex truncate" :to='"/account/" + transfer.source' >
                  <jazzicon v-if="transfer.source!=''" :address='"0x"+transfer.source' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{transfer.source}}</div></router-link>
                </td>
                <td class="truncate px-3">
                  <router-link class="flex truncate" :to='"/account/" + transfer.destination' >
                  <jazzicon :address='"0x"+transfer.destination' :seed="1" :diameter="15" /><div class="pl-1 text-blue-500 hover:underline truncate">{{transfer.destination}}</div></router-link>

                </td>
        <td class=" truncate text-center px-3 py-3 truncate">
            {{formatAmount(transfer.amount)}}
        </td>
        <td class="truncate text-center px-3">
           <div v-if="transfer.success==false" class="text-center">
                  
            <XCircleIcon class="h-10 w-6 block m-auto text-red-500" aria-hidden="true" />
            </div>
            <div v-else="transfer.success==true" class="text-center">
                <CheckCircleIcon class="h-10 w-6 block m-auto  text-green-500" aria-hidden="true" />
            </div>
        </td>

    </tr>
    </tbody>
</table>

</template>