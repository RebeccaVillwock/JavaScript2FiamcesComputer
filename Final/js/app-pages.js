const HomePage = Vue.component('HomePage', {
    props:{
        authUser: {required: true},
    },
    computed: {
        loggedIn() {
            return (this.authUser && this.authUser.uid)
        }
    },
    methods: {

    },
    template: `
        <div class="home page">
            <div v-if="loggedIn"></div>
            <div>
                <p>Home Page</p>
            </div>
        </div>
    `,
});

const AchievementPage = Vue.component('AchievementPage',{
    props:{

    },
    template: `
        <div class="achievement page">
            <div>
                <p>Achievement Page</p>
            </div>
        </div>
    `,
});

const EditGardenPage = Vue.component('EditGardenPage', {
   props:{

   },
   template: `
        <div class="edit page">
            <div>
                <p>Edit Garden Page</p>
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