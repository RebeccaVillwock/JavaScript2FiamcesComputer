//will give us a <list>
Vue.component('List', {

    props:{
        books: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author:{
            type: String,
        }
    },

    methods:{

    },

    computed:{

    },

    template: `
<div class="read-list">
    <h3>{{name}}</h3>
    <ul class="list-group">
        <ListItem v-for="(book, b) in books" :key="book.title" :item="book" class="list-group-item" @remove-book="$emit('remove-book', book)"></ListItem>  
    </ul>
</div>`,
});