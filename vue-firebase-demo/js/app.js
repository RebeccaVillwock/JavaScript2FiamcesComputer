Vue.use(Vuefire);

// Initialize App
var app = new Vue({
    // el: the DOM element to be replaced with a Vue instance
    el: '#app',

    // data: all the data for the app
    data: {
        newRecipe: {
            recipe: new Recipe(),
            image: null,
        },
        recipes: [], // placeholder until firebase data is loaded
        addRecipeModal: false, // show/hide modal
    },

    firestore: {
        // bind as an array by default
        recipes: db.collection('recipes').orderBy('name'),
    },

    // methods: usually "events" triggered by v-on:
    methods: {
        addRecipe(){
            // create local reference to the newRecipe since "this"
            // will not reference the same "this" inside the Promise
            //let theRecipe = this.newRecipe;

            // do some validation
            // TODO

            // add recipe to firebase
            db.collection('recipes') //pick collection
                .add(this.newRecipe.recipe)
                .then((docRef) => {
                    console.log('Added!', docRef);

                    //add the image
                    this.addImage(docRef.id);

                    //clear the form
                    this.newRecipe.recipe = new Recipe();
                })
                .catch((error) => {
                    console.log('Error!', error);
                });

        },
        addImage(docId){
            // docId and image file are required
            if(!docId || !this.newRecipe.image){
                return false;
            }

            // create a filename we know will be unique
            // the other option would be to create a folder for each recipe
            let theRecipe = this.newRecipe;
            let allowedTypes = ['jpg', 'png', 'gif'];
            let extension = theRecipe.image.name.toLowerCase().split('.').pop()

            // validate extension
            if(allowedTypes.indexOf(extension) < 0){
                // invalid extension

                // let the user know...
                // TODO: let the user know WITHOUT alerts
                alert('Invalid file type.');

                return false;
            }

            // validate size (less than 200KB
            if(theRecipe.image.size > (200 * 1024)){
                // file too large

                // let the user know...
                // TODO: let the user know WITHOUT alerts
                alert('File too large. 200KB max');

                return false;
            }

            // add image to firebase
            // .child() to navigate down through the tree
            storage.child('recipes').child(docId)
            //storage.child('recipes/'+docId)
                .put(theRecipe.image)
                .then((snapshot) => {
                    // snapshot refers to the record/file just added
                    console.log("Image added", snapshot);

                    //clear our form
                    this.newRecipe.image = null;

                    //get "browser's URL for image
                    return snapshot.ref.getDownloadURL();
                })
                .then((url) => {
                    return db.collection('recipes').doc(docId).update({image: url});
                })
                .then((docRef) => {
                    console.log('Recipe updated with image URL.');
                })
                .catch((error) => {
                    console.log("Error uploading image.", error)
                    //TODO: Let the user know
                })
        }
    },

});

