<template>
  <nav class="bg-amber-300 md:flex md:justify-between md:items-center pl-10 lg:pr-40 bg-white-500 shadow-md ">

    <div class=" flex items-center justify-between p-2">
       <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black" href="/">
          Teranyina Explorer
        </a>
      <button class=" bg-amber-300 text-gray-500 w-10 h-10 relative focus:outline-none bg-white md:hidden " @click="toggleNavbar">
                <span class="sr-only">Open main menu</span>
                <div class="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                    <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" :class="{'rotate-45': open,' -translate-y-1.5': !open }"></span>
                    <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" :class="{'opacity-0': open } "></span>
                    <span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" :class="{'-rotate-45': open, ' translate-y-1.5': !open}"></span>
                </div>
      </button>
    </div>
    <div>
      
      <ul v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="flex flex-col md:flex md:flex-row flex-col">
          <router-link to='/' class="ml-2 p-2">Home</router-link>

          <div class="relative p-2">
            <!-- Dropdown toggle button -->
            <button
              @click="toggleDropdown"
              class="
                flex
                items-center
                text-black-100
                bg-amber-300
                rounded-md
                focus:outline-none
              "
            >
              <span class="mr-2">Blockchain</span>
              <svg
                class="w-5 h-5 text-black-100"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="showDropdown"
              class="z-10
                py-1
                px-2
                md:ml-8
                md:mt-5
                md:bg-white
                bg-amber-300
                rounded-md
                md:shadow-xl
                md:absolute lg:right-0
                w-44
              "
            >
              <router-link @click="toggleDropdown" to='/blocks' class="ml-2 p-2 block">Blocks</router-link>
              <router-link @click="toggleDropdown" to='/txns' class="ml-2 p-2 block">Transfers</router-link>
              <router-link @click="toggleDropdown" to='/extrinsics' class="ml-2 p-2 block">Extrinsics</router-link>
              <router-link @click="toggleDropdown" to='/events' class="ml-2 p-2 block">Events</router-link>
            </div>
          </div>
          <router-link to='/accounts' class=" p-2">Accounts</router-link>


      </ul>

        
    </div>

  </nav>

  


</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      showMenu: false,
      showDropdown: false,
      open: false,
      openDropdown:false,
    }
  },
  methods: {
    toggleNavbar: function(){
      this.showMenu = !this.showMenu;
      this.open = !this.open;
    },
    toggleDropdown: function(){
      this.showDropdown = !this.showDropdown;
      this.openDropdown = !this.openDropdown;
    }
  }
}
</script>