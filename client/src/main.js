import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:5000/graphql',
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

// Create a provider
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})



app.use(apolloProvider)

app.use(router)
app.mount('#app')
