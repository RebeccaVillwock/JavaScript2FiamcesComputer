function ConsumedMediaItem(media){
    const STATUS = {READ: 'read', UNREAD: 'unread'};

    media.status = STATUS.UNREAD;

    media.consumeMedia = function(){
        this.status = STATUS.READ;
    }

    media.didNotConsumeMedia = function(){
        this.status = STATUS.UNREAD;
    }

    media.isConsumed = function (){
        return this.status === STATUS.READ;
    }

    return media;
}

function OwnedMediaItem(media){
    const STATUS = {OWNED: 'owned', UNOWNED: 'unowned'};

    media.status = STATUS.UNOWNED;

    media.buyMedia = function(){
        this.status = STATUS.OWNED;
    }

    media.didNotBuyMedia = function(){
        this.status = STATUS.UNOWNED;
    }

    media.isOwned = function(){
        return this.status === STATUS.OWNED;
    }

    return media;
}

function Book(title, author, enjoyed){
    this.title = title;
    this.author = author;
    this.enjoyed = true;
}


//make collections instead of functions
