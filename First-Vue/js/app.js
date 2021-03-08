const app = new Vue({
    el: '#app',

    //data: all the data for the app
    data: function(){
        return{
            newBook: {
                title: '',
                author: '',
                category: '',
                enjoyed: false,
            },
            booksList: [
                {title: 'The Way of Kinds', author: 'Brandon Sanderson', category: 'read', enjoyed: 'true'},
                {title: 'Romance of The Three Kingdoms', author: 'Lua Guanzhong', category:'unread', enjoyed: 'false'},
                {title: 'The Mists Of Avalon', author: 'Marion Zimmer Bradley', category: 'read', enjoyed: 'true'}
            ],

        }

    },

    //methods: usually "events" triggered by v-on:
    methods:{
        addBook: function(e){
            this.booksList.push(this.newBook);

            this.newBook = {
                title: '',
                author: '',
                category: 'unread',
                enjoyed: false,
            };

            $('#addBookModal').model('hide');
        },

        removeIt: function(book){
            this.booksList.splice(this.shoppingList.indexOf(book), 1);
        }

    },

    //computed: values that are updated and cached if dependencies change
    computed:{
        unreadList: function(){
            return this.booksList.filter(function(book){
               return book.category === 'unread';
            });
        },

        enjoyedList: function(){
            return this.booksList.filter(function(book){
               return book.category === 'read' && book.enjoyed;
            });
        },
        dislikedList: function(){
            return this.booksList.filter(function(book){
                return book.category === 'read' && !book.enjoyed;
            });
        }

    },

    //mounted: called after the instance has been mounted,
    mounted: function(){
        if(localStorage.getItem('booksList')){
           this.booksList = JSON.parse(localStorage.getItem('booksList'));
        }
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