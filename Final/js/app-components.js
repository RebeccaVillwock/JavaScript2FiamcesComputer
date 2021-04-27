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

   },
    template: `
        <ul class="list-unstyled components">
        <li><router-link to="/home">Home</router-link></li>
        <li><router-link to="/achievements">Achievements</router-link></li>
        <li><router-link to="/edit">Edit Garden</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/create-account">Create Account</router-link></li>
</ul>
    `,
});
