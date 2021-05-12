Vue.component('flower', {
   props: {
       Flower: {type: Object, required: true},
       authUser: {type: Object},
   } ,
    date: {

    },
    firestore: function(){
        return {
            garden: db.collection('garden').where('createdBy.email', '==', this.authUser.email),
        };
    },
    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        }
    },
    methods: {
       addFlower(){
           db.collection('garden').doc(this.garden[0].id).update({flowers: firebase.firestore.FieldValue.arrayUnion(this.Flower)});
       },
        removeFlower(){

        }

    },
    template: `
        <div class="flower">
            <div class="card">
                <div class="col-6">
                <div class="card-header" v-if="Flower.Name" class="name"><strong>{{Flower.Name}}</strong></div>
                    <p v-if="Flower.Season" class="season">Blooms In: {{Flower.Season}}</p>
                    <p v-if="Flower.Space" class="space">Space Needed: {{Flower.Space}} in</p>
                    <button class="btn-secondary" @click="addFlower()">Add</button>
                    <button class="btn-secondary" @click="removeFlower()">Remove</button>
                </div>
            </div>
        </div>
    `
});

Vue.component('flowerList', {
   props: {
       collection: {type: String},
       user: {type: Object},
       authUser: {type: Object},
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
                   flowers: db.collection('Flowers'),
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
            <flower v-if="flowers" v-for="flower in flowers" :Flower="flower" :auth-user="authUser" :key="flower.id"></flower>
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
       authUser: {required: true},
   },
    data: function(){
        return {
            garden: [],
            flowers: [],
        };
    },
    firestore: function(){
        return {
            garden: db.collection('garden').where('createdBy.email', '==', this.authUser.email),
        };
    },
   computed: {
       loggedIn() {
           return (this.authUser && this.authUser.uid);
       }
   },
   methods: {
       addFlower(theFlower){
           //garden.flowers.add(flower);
           db.collection('garden').where('createdBy.email', '==', this.authUser.email).collection('flowers')
               .add(theFlower)
               .then(function(){
                   console.log("Flower Added To Garden List");
               })
       },
       removeFlower(flower){

       }
   },
   template: `
    <div class="row">
        <div class="col-md-8">
            <div v-if="garden[0].size < 10">
                <img src="images/small-garden-full.jpg" alt="small garden" height="450" width="500">   
            </div>
            <div v-else-if="garden[0].size < 20">
                <img src="images/medium-garden-full.jpg" alt="medium garden" height="450" width="500">   
            </div>
            <div v-else-if="garden[0].size > 20">
                <img src="images/large-garden-full.jpg" alt="large garden image" height="450" width="500">
            </div>
            <div v-else>
                Time To get Started!!
            </div>
        </div>
        <div class="col-md-4">
            <flower v-if="flowers" v-for="flower in flowers" :key="flower.id" :Flower="flower" :auth-user="authUser"></flower>
        </div>
    </div>
   `,

});
