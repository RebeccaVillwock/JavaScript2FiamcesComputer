// The 'Model' is responsible for managing the data of the application.
// You can define your models in the 'data' section of each Vue component
// or define them separately if they might be used by multiple components.

// Models are usually prototypes (similar to classes if you are familiar with those)
//Prototypes/Classes use TitleCase
function LibraryItem(media){
    //list of possible status
    const STATUSES = {CHECKED_OUT: 'out', AVAILABLE: 'in'};

    //set the default status
    this.status = STATUSES.AVAILABLE;

    //stores the book/movie/whatever inside the library item
    this.media = media;


    //methods
    this.checkIn = function(){
        this.status = STATUSES.AVAILABLE;
    }

    this.checkOut = function(){
        this.status = STATUSES.CHECKED_OUT;
    }

    this.isAvailable = function (){
        return this.status === STATUSES.AVAILABLE;
    }

}
//let book = new LibraryItem('Interaction Design', 200);
//let movie = new LibraryItem('Strange Brew', null, 92);

function Book(title, pages){
    this.title = title;
    this.pages = pages;
}


//set the parent/prototype
Book.prototype = Object.create(LibraryItem.prototype);

//reset the constructor
Book.prototype.constructor = Book;


// same as
//only around since 2015
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