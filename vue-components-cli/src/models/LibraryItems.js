function LibraryCollection(){
    this.__proto__ = []

    this.addItem = function(item){
        //this.push works because "this" is also an array
        this.push(new LibraryItem(item));

        //return this so we can chain methods
        return this;
    }
}


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

// export for use as JS modules
export {LibraryItem, Book, Movie}