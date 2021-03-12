// The 'Model' is responsible for managing the data of the application.
// You can define your models in the 'data' section of each Vue component
// or define them separately if they might be used by multiple components.

// Models are usually prototypes (similar to classes if you are familiar with those)
//Prototypes/Classes use TitleCase
function LibraryItem(media){
    //list of possible status
    const STATUSES = {CHECKED_OUT: 'out', AVAILABLE: 'in'};

    //set the default status
    media.status = STATUSES.AVAILABLE;


    //methods
    media.checkIn = function(){
        this.status = STATUSES.AVAILABLE;
    }

    media.checkOut = function(){
        this.status = STATUSES.CHECKED_OUT;
    }

    media.isAvailable = function (){
        return this.status === STATUSES.AVAILABLE;
    }

    return media;

}
//let book = new LibraryItem('Interaction Design', 200);
//let movie = new LibraryItem('Strange Brew', null, 92);

function Book(title, pages){
    this.title = title;
    this.pages = pages;
}





// same as
class Movie{
    constructor(title, runtime) {
        this.title = title;
        this.runtime = runtime;
    }
}

let libraryBook= new LibraryItem(book);

let book = new Book('Interaction Design', 200);
let movie = new Movie('Strange Brew', 92);

console.log(book);
console.log(movie);
console.log(libraryBook);