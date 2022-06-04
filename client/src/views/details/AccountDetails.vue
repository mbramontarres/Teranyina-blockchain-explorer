<script>
// @ts-nocheck
import gql from 'graphql-tag'
import TransfersTable from '@/components/TransfersTable.vue'
//import EventsTable from '@/components/EventsTable.vue'
import commonjs from '../../commons.js'
import Jazzicon from 'vue3-jazzicon/src/components';
export default {
  mixins: [commonjs],
  components: {
    TransfersTable,
    [Jazzicon.name]: Jazzicon
    },
  data () {
    return {
        // Initialize your apollo data
        //transfers: [],
        accountAndTransfers: [],
        account: [],
        accountTransfers: [],
        openTab: 1,
      }
  },
  methods: {
    toggleTabs: function(tabNumber){
      this.openTab = tabNumber
    }
  },
  apollo: {
    accountAndTransfers: {
        query: gql`query ($accountId: String!){
            account(accountId:$accountId ){
                accountId
                freeBalance
                totalBalance
                lockedBalance
                reservedBalance
                availableBalance
                nonce
            },
            accountTransfers(accountId: $accountId){
                blockNum
                hash
                source
                destination
                amount
                success
                    
            }
                        
        }`,
        
        variables () {
        return {
            
            accountId: this.$route.params.accountId,
        }
            },
        result({ data }) {
            
            this.account = data.account,
            this.accountTransfers = data.accountTransfers;
            //this.accountAndTransfers = {this.account,};
        },
    },

    

  },
}

</script>


<template>


    <div class=" bg-gray-50  min-h-full">
        <div class="sm:container sm:mx-auto  items-center justify-center py-2 px-1">
            <div class=" flex items-center truncate" >
                 <jazzicon :address='"0x"+account.accountId' :seed="1" :diameter="100" />
                 <div class=" pl-2 text-xl items-center truncate">
                    <b>{{account.accountId}}</b>
                    <div class="truncate">
                    Total: {{formatAmount(account.totalBalance)}}
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md px-2 py-1 mt-4">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Account</b>
                    </div>
                    <div class="w-2/3 truncate">
                        {{account.accountId}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Free Balance</b>
                    </div>
                    <div class="w-2/3">
                        <p>{{formatAmount(account.freeBalance)}}</p>
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Locked Balance</b>
                    </div>
                    <div class="w-2/3 truncate">
                        {{formatAmount(account.lockedBalance)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Reserved Balance</b>
                    </div>
                    <div class="w-2/3 truncate">
                         {{formatAmount(account.reservedBalance)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Available Balance</b>
                    </div>
                    <div class="w-2/3">
                         {{formatAmount(account.availableBalance)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Total Balance</b>
                    </div>
                    <div class="w-2/3">
                         {{formatAmount(account.totalBalance)}}
                    </div>
                </div>
                <hr class="w-full">
                <div class="flex flex-col md:flex-row py-2">
                    <div class="w-1/3">
                        <b class="py-1 px-2">Nonce</b>
                    </div>
                    <div class="w-2/3">
                         {{account.nonce}}
                    </div>
                </div>

            </div>
            <div class="bg-white rounded-lg shadow-md  mt-4">
                <div class="w-full">
                    <ul class="flex mb-0 list-none flex-wrap  flex-row">
                        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center ">
                        <a class="border border-1 border-slate-300 text-xs font-bold uppercase px-5 py-3 shadow-lg rounded-t-lg block leading-normal w-full" v-on:click="toggleTabs(1)" v-bind:class="{'text-orange-600 bg-white': openTab !== 1, 'text-white bg-orange-600': openTab === 1}">
                            Transfers
                        </a>
                        </li>
                    </ul>
                    <hr class="bg-orange-600">
                    <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div class="px-1 py-1 flex-auto">
                        <div class="tab-content tab-space">
                            <div v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
                                <TransfersTable :transfers=accountTransfers />
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    </div>

            </div> 
            
        </div>
        
    </div>
</template>