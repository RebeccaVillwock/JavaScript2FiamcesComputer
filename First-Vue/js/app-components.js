//will give us a <list>
Vue.component('List', {

    props: {
        books: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
        }
    },

    methods: {},

    computed: {},

    template: `
<div class="read-list">
    <h3>{{name}}</h3>
    <ul class="list-group list-group-flush">
        <ListItem v-for="(book, b) in books" :key="book.title" :book="book" class="list-group-item" @remove-book="$emit('remove-book', book)"></ListItem>  
    </ul>
</div>
`,


});

Vue.component('ListItem',{
    data: function(){
        return{
            uid: Math.floor(Math.random() * 10e16),
        }
    },
    props: {
        book: {
            type: Object,
            required: true,
        }
    },
    methods: {

    },
    template: `
    <li class="list-group-item">
        <div class="custom-control custom-checkbox">
            <input v-model="book.read" type="checkbox" :id="uid" class="custom-control-input">
            <label :for="uid" class="custom-control-label">{{book.title}}</label>
        </div>
        <div class="d-flex justify-content-between">
            <small>{{book.author}}</small>
        </div>
    </li>
    `,


});