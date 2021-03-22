const app = new Vue({
    el: '#app',

    //data: all the data for the app
    data: function(){
        return{


        }

    },

    //methods: usually "events" triggered by v-on:
    methods:{



    },

    //computed: values that are updated and cached if dependencies change
    computed:{


    },

    //mounted: called after the instance has been mounted,
    mounted: function(){

    },

    //watch: calls the function if the value changes
    watch:{
        booksList:{
            handler: function(newList){
                localStorage.setItem('booksList', JSON.stringify(newList));
            },
            deep: true,
        },
    }
});