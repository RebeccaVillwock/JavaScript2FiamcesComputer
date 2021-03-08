// will gives us a <list>
Vue.component('List', {

    props: {
        items: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            default: "Get It",
        },
    },

    methods: {
        add: function(item){
            // objects are passed by reference
            // this will update this item object, the items array, and the shoppingList array in the app
            item.qty++;
        },

        subtract: function(item){
            item.qty--;

            // DO NOT DO THIS
            //app.shoppingList.splice(...);

            // remove if qty is zero
            if(item.qty <= 0){
                // this will emit an event called "remove-item"
                this.$emit('remove-item', item);

            }
        }
    },

    computed: {


    },

    template: `
        <div class="get-it-list">
        
                <h3>{{name}}</h3>
                <ul class="list-group list-group-flush">
                    <ListItem v-for="(item, i) in items" :key="item.name" :item="item" class="list-group-item" @remove-item="$emit('remove-item', item)" ></ListItem>
                </ul>
                <p>
                    <small>Total: {{items.length}}</small>
                </p>
            </div>
        `,


});





Vue.component('ListItem', {
    // this would be equivalent to a "static" property in java, c#, php
    // data: {
    //     id: Math.floor(Math.random() * 10e16),
    // },

    // this is more like a constructor that is called for each new instance
    data: function(){
        return {
            uid: Math.floor(Math.random() * 10e16),
        }
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
        qty: {
            type: Number,

        }
    },

    methods: {
        add: function(){
            // objects are passed by reference
            // this will update this item object, the items array, and the shoppingList array in the app
            this.item.qty++;
        },

        subtract: function(){
            this.item.qty--;

            // DO NOT DO THIS
            //app.shoppingList.splice(...);

            // remove if qty is zero
            if(this.item.qty <= 0){
                // this will emit an event called "remove-item"
                //this.$emit('remove-item', this.item);

            }
        }
    },

    template: `
        <li class="list-group-item">
            <div class="custom-control custom-checkbox">
                <input v-model="item.purchased" type="checkbox" :id="uid" class="custom-control-input">
                <label :for="uid" class="custom-control-label">{{item.name}}</label>
            </div>
            <div class=" d-flex justify-content-between">
                <div>
                    <small>Qty: {{item.qty}}</small>
                </div>
                <div>
                    <button class="btn btn-tiny" @click="add"><i class="fas fa-plus-circle"></i></button>
                    <button class="btn btn-tiny" @click="subtract"><i class="fas fa-minus-circle"></i></button>
                </div>
            </div>
        </li>
    
    `,
});

