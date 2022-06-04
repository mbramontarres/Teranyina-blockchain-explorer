import Home from './views/Home.vue'

import Txns from './views/Txns.vue'
import Blocks from './views/Blocks.vue'
import Extrinsics from './views/Extrinsics.vue'
import Events from './views/Events.vue'
import BlockDetails from './views/details/BlockDetails.vue'
import TransferDetails from './views/details/TransferDetails.vue'
import AccountDetails from './views/details/AccountDetails.vue'
import ExtrinsicDetails from './views/details/ExtrinsicDetails.vue'
import EventDetails from './views/details/EventDetails.vue'
import NotFound from './views/NotFound.vue'
import Accounts from './views/Accounts.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  {
    path: '/txns',
    meta: {title: 'Txns'},
    component: Txns,
  },
  {
    path: '/blocks',
    meta: {title: 'Blocks'},
    component: Blocks,
  },
  {
    path: '/extrinsics',
    meta: {title: 'Extrinsics'},
    component: Extrinsics,
  },
  {
    path: '/events',
    meta: {title: 'Events'},
    component: Events,
  },
  {
    path: '/accounts',
    meta: {title: 'Accounts'},
    component: Accounts,
  },
  {
    path: '/block/:numBlock',
    name: 'block',
    meta: {title: 'Block :numBlock'},
    component: BlockDetails,
  },
  {
    path: '/transfer/:hash',
    name: 'transfer',
    meta: {title: 'Transfer :hash'},
    component: TransferDetails,
  },
  {
    path: '/extrinsic/:blockNum/:extrinsicIndex',
    meta: {title: 'Extrinsic'},
    name: 'extrinsic',
    component: ExtrinsicDetails,
  },
  {
    path: '/event/:blockNum/:eventIndex',
    meta: {title: 'Event'},
    name: 'event',
    component: EventDetails,
  },
  {
    path: '/account/:accountId',
    name: 'account',
    meta: {title: 'Account :accountId'},
    component: AccountDetails,
  },
  { path: '/:path(.*)', component: NotFound },
]
