const LibraryComponent = Vue.component('Library', {
    // this function is run AFTER the props have been passed in
    data() {
        return {
            library: [
                new Book('Learning Vue', 120),
                new Book('Interaction Design', 200),
                new Movie('Princess Bride', 118),
                new Movie('Strange Brew', 92),

            ]
        }
    },

    // values/bindings passed to this component
    props: {

    },

    // functions that you want to use in your view that are triggered manually
    methods: {

    },

    // props/data that needs to be calculated when dependencies change
    computed: {

    },

    // the view
    template: `
        <div class="card-columns">
            <LibraryItem v-for="thing in library" :item="thing"></LibraryItem>
        </div>`,

    //<h3 class="card-title">{{thing.title}}</h3>
    //                 <p class="card-text" v-if="thing.constructor.name == 'Book'">Pages:{{thing.pages}}</p>
    //                 <p class="card-text" v-if="thing.runtime">Runtime: {{thing.runtime}}</p>
});

const LibraryItemComponent = Vue.component('LibraryItem', {
    props:{
        item: {
            type: Object,
            required: true,

        }
    },
    computed:{
        typeOfItem(){
            return this.item.constructor.name;
        }
    },
    template: `
        <div class="card" :class="{'border-success': item.isAvailable(), 'border-warning': !item.isAvailable()}">
                <component :is="typeOfItem" :item="item" class="card-body"></component>
                <div class="card-footer">
                    <button v-if="item.isAvailable()" @click="item.checkOut()" class="btn btn-success">Checkout</button>
                    <button v-if="!item.isAvailable()" @click="item.checkIn()" class="btn btn-warning">Return</button>
                </div>
        </div>
    `,
});


const BookComponent = Vue.component('Book', {
  //props:{
    //  item: {
    //      type: Object,
      //    required: true,

      //}
  //},

    //variable referenceing the component we want to extend
    extends: LibraryItemComponent,
    template: `
        <div class="book">
            <h3 class="card-title">{{item.title}}</h3>
            <p class="card-text">Pages: {{item.pages}}</p>
        </div>
    `,
});

const MovieComponent = Vue.component('Movie', {
    extends: LibraryItemComponent,

    template: `
        <div class="movie">
            <h3 class="card-title">{{item.title}}</h3>
            <p class="card-text">Runtime: {{item.runtime}}</p>
        </div>
    `,
});