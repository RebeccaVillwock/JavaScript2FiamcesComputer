const HomePage = Vue.component('HomePage', {
    props:{
        authUser: {required: true},
    },

    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid)
        },
        gardenSize(){
            return this.garden[0].size
        }
    },
    methods: {

    },
    template: `
        <div class="home page">
            <div v-if="loggedIn">
                <h2>{{authUser.displayName}}'s Garden</h2>
                <garden :auth-user="authUser"></garden>
            </div>
            <div v-else>
                <h2>Get Your Garden Started Today</h2>
                <div class="row">
                    <div class="col-md-6">
                        <img src="images/large-garden-full.jpg" alt="large garden image" height="450">
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-4">
                        <h4>Flowers</h4>
                        <flower-list collection="all" :auth-user="authUser"></flower-list>
                    </div>
                </div>
            </div>
        </div>
    `,
});

const AchievementPage = Vue.component('AchievementPage',{
    props:{
        authUser: {required: true},
    },
    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
    },

    template: `
        <div class="achievement page">
            <h2>Achievements</h2>
            <div v-if="loggedIn">
                <p>Coming Soon</p>
            </div>
            <div v-else>
                <p class="text-warning">Please Login to see this page</p>
            </div>
        </div>
    `,
});

const EditGardenPage = Vue.component('EditGardenPage', {
   props:{
       authUser: {required: true},

   },
    data: function(){
      return {
          editGarden: new Garden(),
      };
    },
    computed: {
      loggedIn() {
          return (this.authUser && this.authUser.uid);
      },
    },
    methods: {
        login() {
            let provider = new firebase.auth.GoogleAuthProvider();

            //login with google
            firebase.auth()
                //.signInWithEmailAndPassword(email, password)
                .signInWithPopup(provider)
                .catch(function (error) {
                    // Handle Errors here.
                    let errorCode = error.code;
                    let errorMessage = error.message;
                });
        },
      addGarden(){
          let theGarden = this.editGarden;

          theGarden.createdBy = this.authUser;

          db.collection('garden')
              .add(theGarden)
              .then(function(docRef){
                  console.log("document written:", docRef);

                  theGarden = new Garden();

                  router.push({name: 'garden', params: {id: docRef.id} })
              })
              .catch(function(error){
                 console.error("Error adding document: ", error);
              });
      }
    },
   template: `
        <div class="edit page">
            <h2>Edit Garden</h2>
            <b-form v-if="loggedIn" @submit.prevent="addGarden">
                <b-form-group label="Size" label-for="size" class="col-md-6">
                    <b-form-input id="size" v-model="editGarden.size" type="number" required></b-form-input>
                </b-form-group>
                
                <b-form-group label="Season" lable-for="season" class="col-md-6">
                    <b-form-input id="season" v-model="editGarden.season"></b-form-input>
                </b-form-group>
                
                <b-button type="submit" varient="secondary">Submit</b-button>
            </b-form>
            <div v-else>
                <p class="text-warning">Please Login to see this page</p>
                <a class="text-body" href="#" @click.prevent="login">Login</a>
            </div>
            
        </div>
    `,
});

const LoginPage = Vue.component('LoginPage', {
   props: {

   },
    method: {
       login(){
           firebase.auth.onAuthStateChanged((user) => {
               console.log('Signed in as: ', user.email);

               this.authUser = new User(user);
           });


       }
    },
   template: `
        <div class="login page">
             <div class="row">
                <div class="col-sm-1 col-md-4"></div>
                <div class="col-sm-12 col-md-4">
                    <form @submit.prevent="login">
                        <div class="form-group">
                            <label for="userEmail">Email: </label>
                            <input type="email" id="userEmail" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="userPassword">Password: </label>
                            <input type="password" id="userPassword" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
                <div class="col-sm-1 col-md-4"></div>
            </div>
        <div class="row">
            <div class="col-4">
                <router-link to="/create-account">Create Account</router-link>
            </div>
        </div>  
        </div>
    `,
});

const CreateAccountPage = Vue.component("CreateAccountPage", {
    props: {

    },
    template: `
        <div class="create-account page">
            <div>
                <p>Create Account Page</p>
            </div>
        </div>
    `,
});
const ListAllFlowersPage = Vue.component("ListAllFlowersPage", {
   props: {
       authUser: {required: true}
   },
    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid);
        },
    },
    methods: {

    },
    template: `
        <div class="list-all-flowers page">
            <h2>All Flowers</h2>
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <h3>Spring</h3>
                    <flower-list collection="spring" v-if="loggedIn" :auth-user="authUser"></flower-list>
                </div>
                <div class="col-md-4 col-sm-12">
                    <h3>Summer</h3>
                    <flower-list collection="summer" v-if="loggedIn" :auth-user="authUser"></flower-list>
                </div>
                <div class="col-md-4 col-sm-12">
                    <h3>Fall</h3>
                    <flower-list collection="fall" v-if="loggedIn" :auth-user="authUser"></flower-list>
                </div>
            </div>
        </div>
    `,
});