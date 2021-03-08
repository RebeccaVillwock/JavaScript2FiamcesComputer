const app = new Vue({
    el: '#app',

    // data: all the data for the app
    data: function() {
        return {
            newItem: {
                name: '',
                qty: 1,
                category: 'need',
                purchased: false,
            },
            shoppingList: [
                {name: 'Hammer', qty: 1, purchased: true, category: 'need'},
                {name: 'Nails', qty: 10, purchased: false, category: 'need'},
                {name: 'Sliding Compound Miter Saw', qty: 1, purchased: false, category: 'want'}
            ],

        }
    },
    // methods: usually "events" triggered by v-on:
    methods: {
        addIt: function(e){
            //e.preventDefault();

            // add item to the list
            this.shoppingList.push(this.newItem);

            // clear the form
            this.newItem = {
                name: '',
                qty: 1,
                category: 'need',
                purchased: false,
            };

            // close modal window
            // (eventually this won't be jQuery)
            // (typically, we don't do dom manipulation in vue)
            $('#addItemModal').modal('hide');
        },

        removeIt: function(item){
            //console.log(item);

            // find item in the shopping list and remove it
            this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
        }
    },
    // computed: values that are updated and cached if dependencies change
    computed: {
        needList: function(){
            return this.shoppingList.filter(function(item){
                // return true if we want to keep it in the list
                return !item.purchased && item.category === 'need';
            });
        },

        gotList: function(){
            return this.shoppingList.filter(function(item){
                // return true if we want to keep it in the list
                return item.purchased;
            });
        },

        wantList: function(){
            return this.shoppingList.filter(function(item){
                // return true if we want to keep it in the list
                return !item.purchased && item.category === 'want';
            });
        },
    },
    //mounted:  called after the instance has been mounted,
    mounted: function() {
        // put the list from localStorage into the app (if it exists)
        if(localStorage.getItem('shoppingList')){
            this.shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
        }
    },
    // watch: calls the function if the value changes
    // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
    watch: {
        shoppingList: {
            // call this when an item in the array changes
            handler: function(newList){
                // remove items with a qty of zero
                newList.map((item) => {
                    if(item.qty <= 0){
                        // this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
                        this.removeIt(item);
                    }
                })

                // store in localstorage
                localStorage.setItem('shoppingList', JSON.stringify(newList));
            },

            // watch nested properties as well
            deep: true,
        },

    }
});
