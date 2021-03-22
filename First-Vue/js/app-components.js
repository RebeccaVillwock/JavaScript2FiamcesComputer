//will give us a <list>
const BookShelfComponent = Vue.component('BookShelf', {

    data(){
        return {
            bookShelf: [
                new OwnedMediaItem(new ConsumedMediaItem(new Book('The Way Of Kings', 'Brandon Sanderson', true))),
                new OwnedMediaItem(new ConsumedMediaItem(new Book('The Mists Of Avolone','Marion Zimmer Bradley', false))),
                new OwnedMediaItem(new ConsumedMediaItem(new Book('Words of Radiance', 'Brandon Sanderson', true))),
            ]
        }
    },
    props: {

    },

    methods: {},

    computed: {},

    template: `
    <div class="card-columns">
        <div class="card" v-for="book in bookShelf" :book="book">
            <div class="card-header">
                <!-- for designating whether or not the book was enjoyed -->
                <i v-if="book.enjoyed" class="fas fa-star"></i>
                <i v-if="!book.enjoyed" class="far fa-star"></i>
            </div>
            
            <div class="card-body">
                <h2>{{book.title}}</h2>
                <p>{{book.author}}</p>
            </div>
            
            <div class="card-footer">
                <button v-if="!book.isConsumed()" @click="book.consumeMedia()">Read</button>
                <button v-if="book.isConsumed()" @click="book.didNotConsumeMedia()">Didn't Read</button>
                
                <button v-if="!book.isOwned()" @click="book.buyMedia()">Owned</button>
                <button v-if="book.isOwned()" @clock="book.didNotBuyMedia">Don't Own</button>
               
            </div>
        </div>
    </div>

`,


});
