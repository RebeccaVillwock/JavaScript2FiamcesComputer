Vue.component('flower', {
   props: {
       Flower: {type: Object, required: true},
   } ,
    date: {

    },
    computed: {

    },
    methods: {
       addFlower(){

       },
        removeFlower(){

        }

    },
    template: `
        <div class="flower">
            
                <div class="col-6">
                    <h3 v-if="Flower.Name" class="name">{{Flower.Name}}</h3>
                    <p v-if="Flower.Season" class="season">{{Flower.Season}}</p>
                    <p v-if="Flower.Space" class="space">{{Flower.Space}}</p>
                    <button @click="addFlower()">Add</button>
                    <button @click="removeFlower()">Remove</button>
                </div>
        </div>
    `
});

Vue.component('flowerList', {
   props: {
       collection: {type: String},
       user: {type: Object}
   },
   data: function(){
       return {
           flowers: null,
       };
   },
   firestore: function(){
       switch(this.collection){
           case 'all':
               return {
                   flowers: db.collection('Flowers').orderBy('name'),
               };
           case 'spring':
               return {
                   flowers: db.collection('Flowers').where('Season', '==', 'Spring'),
               };
           case 'summer':
               return{
                   flowers: db.collection('Flowers').where('Season', '==', 'Summer'),
               };
           case 'fall':
               return{
                 flowers: db.collection('Flowers').where('Season', '==', 'Fall'),
               };
       }
   },
    computed: {

    },
    methods: {

    },
    template: `
        <div class="flower-list">
            <flower v-if="flowers" v-for="flower in flowers" :Flower="flower" :key="flower.id"></flower>
        </div>
    `
});

Vue.component('navigation', {
   props: {
       authUser: { required: true},
   },
    methods: {
      login(){
          let provider = new firebase.auth.GoogleAuthProvider();

          //login with google
          firebase.auth()
              .signInWithPopup(provider)
              //.signInWithEmailAndPassword(email, password)
              .catch(function(error){
                  let errorCode = error.code;
                  let errorMessage = error.message;
              });
      },
      logout(){
          firebase.auth().signOut();
      }
    },
    template: `
        <ul class="list-unstyled components">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/achievements">Achievements</router-link></li>
            <li><router-link to="/edit">Edit Garden</router-link></li>
            <li><router-link to="/all-flowers">All Flowers</router-link></li>
            <li v-if="authUser"><a href="#" @click.prevent="logout">Logout</a></li>
            <li v-else><a href="#" @click.prevent="login">Login</a></li>
        </ul>
    `,
});
Vue.component('garden',{
   props: {
       flower: {type: Object, required: true},
       authUser: {required: true},
   },
   data: function(){
       return{
           flowers: [],
           size: ''
       };
   },
   firestore: function(){
       return{
           flowers: db.collection('flowers').doc(this.garden.id).collection('flowers').orderBy('name'),
       };
   },
   computed: {
       loggedIn() {
           return (this.authUser && this.authUser.uid);
       }
   },
   methods: {
       addFlower(flower){
         flowers.append(flower);
       },
       removeFlower(flower){
           flowers.remove(flower);
       }
   }
});
