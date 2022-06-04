<script>
//@ts-check
import gql from 'graphql-tag'

export default {
  data () {
    return {
        input: '',
    }
  },
  methods: {
    search() {
        //canviar 1 per 5 quan teranyina
        var accountRegex = new RegExp("(5[0-9a-zA-Z]{47})|(1[0-9a-zA-Z]{46})");
        var blockRegex = new RegExp("\\d+");
        var transferRegex = new RegExp("0x[0-9a-zA-Z]{64}");
        if (transferRegex.test(this.input)){
            this.$router.push('/transfer/'+this.input)
        }
        else if(accountRegex.test(this.input)){
            this.$router.push('/account/'+ this.input)
        }
        else if (blockRegex.test(this.input)) {

            this.$router.push('/block/'+this.input)
        }
         
        else{
            alert("Invalid input: No match found for Account, Transfer or Block");
        }
    }
  },
}
</script>

<template>

<div class="input-group relative flex flex-row flex-wrap items-stretch w-full mb-4">
        
    <input v-model="input" type="search" class="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search block/transfer/account" aria-label="Search" aria-describedby="button-addon2">
    <button @click="search" class="btn inline-block px-6 py-2.5 bg-amber-600 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-amber-700 hover:shadow-lg focus:bg-amber-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
    </button>
</div>

</template>