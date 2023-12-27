import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';
import AuthLayout from '@/components/Layouts/AuthLayout.vue';
import MainLayout from '@/components/Layouts/MainLayout.vue';
import CreatePost from '@/views/CreatePost.vue';
import Posts from '@/views/Posts.vue';
import Profile from '@/views/Profile.vue';
import PostDetails from '@/views/PostDetails.vue';
import StarredPosts from '@/views/StarredPosts.vue';
import OAuth2Handler from '@/views/callbacksHandlers/OAuth2Handler.vue';
import NotFound from '@/views/NotFound.vue';
import EditName from '@/components/ProfileOptions/EditName.vue';
import EditPassword from '@/components/ProfileOptions/EditPassword.vue';
import RestorePasswordHandler from '@/views/callbacksHandlers/RestorePasswordHandler.vue';
import ConfirmEmailHandler from '@/views/callbacksHandlers/ConfirmEmailHandler.vue';
import RestorePassword from '@/views/RestorePassword.vue';


const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    meta: { guest: true },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { guest: true },
      },
      {
        path: '/CreatePost',
        name: 'CreatePost',
        component: CreatePost
      },
      {
        path: '/Posts',
        name: 'Posts',
        component: Posts,
        meta: { guest: true },
      },
      {
        path: '/Profile',
        name: 'Profile',
        component: Profile,
        children: [
          {
            path: '/Profile/edit-name',
            name: 'EditName',
            component: EditName
          },
          {
            path: '/Profile/edit-password',
            name: 'EditPassword',
            component: EditPassword
          }
        ]
      },
      {
        path: '/Post/:id',
        name: 'PostDetails',
        component: PostDetails,
        meta: { guest: true },
      },
      {
        path: '/StarredPosts',
        name: 'StarredPosts',
        component: StarredPosts
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    meta: { guest: true },
    children: [
      {
        path: '/auth',
        name: 'Authorization',
        redirect: '/auth/login',
        meta: { guest: true },
      },
      {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        meta: { guest: true },
      },
      {
        path: '/auth/signup',
        name: 'SignUp',
        component: SignUp,
        meta: { guest: true },
      },
      {
        path: '/auth/sign-up/handler',
        name: 'ConfirmEmailHandler',
        component: ConfirmEmailHandler,
        meta: { guest: true }
      },
      {
        path: '/auth/oauth2',
        component: OAuth2Handler,
        meta: { guest: true }
      },
      {
        path: '/auth/restore-password',
        name: 'RestorePassword',
        component: RestorePassword,
        meta: { guest: true }
      },
      {
        path: '/auth/restore-password/handler',
        component: RestorePasswordHandler,
        meta: { guest: true }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  if (to.matched.some((record) => !record.meta.guest) && to.name !== 'Login') {  // TODO: test not only for Login
    if (!store.getters.authorized) {
      return { name: 'Authorization' }
    }
  }

})

export default router;