Vue.use(Vuefire);

const router = new VueRouter({
   routes: [
       {path: '/', component: HomePage},
       {name: 'home', path: '/home', component: HomePage},
       {name: 'achievements', path: '/achievements', component: AchievementPage},
       {name: 'edit', path: '/edit', component: EditGardenPage},
       {name: 'login', path: '/login', component: LoginPage},
       {name: 'createaccount', path: '/create-account', component: CreateAccountPage},
   ],
});

var app = new Vue({

   el: '#app',
    router: router,

   data:{

       flowerList: [],
       authUser : null,

   },

   firestore:{
       flowerList: db.collection('Flowers').orderBy('name'),
   },
   methods:{

   },
    created: function(){
       firebase.auth().onAuthStateChanged((user) => {
          if(user){
              console.log('Signed in as: ', user);

              this.authUser = new User(user);
          } else {
              console.log('Not signed in');

              this.authUser = null;
          }
       });
    }
});