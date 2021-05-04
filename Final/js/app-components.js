Vue.component('Flower', {
   props: {
       Flower: {type: Object, required: true},
   } ,
    date: {

    },
    computed: {

    },
    methods: {

    },
    template: ``
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
            <li v-if="authUser"><a href="#" @click.prevent="logout">Logout</a></li>
            <li v-else><a href="#" @click.prevent="login">Login</a></li>
        </ul>
    `,
});
