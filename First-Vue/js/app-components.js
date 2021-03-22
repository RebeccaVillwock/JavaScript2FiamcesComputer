//will give us a <list>
const BookShelfComponent = Vue.component('BookShelf', {

    data(){
        return {
            bookShelf: [
                new Book('The Way Of Kings', 'Brandon Sanderson'),
                new Book('The Mists Of Avolone','Marion Zimmer Bradley'),
                new Book('Words of Radiance', 'Brandon Sanderson'),
            ]
        }
    },
    props: {

    },

    methods: {},

    computed: {},

    template: `
    <div class="card-columns">
        <div class="card">
            <div class="card-header">
                <!-- for designating whether or not the book was enjoyed -->
                <i class="fas fa-star"></i>
                <i class="far fa-star"></i>
            </div>
            
            <div class="card-body">
                <h2></h2>
            </div>
            
            <div class="card-footer">
            
            </div>
        </div>
    </div>

`,


});
