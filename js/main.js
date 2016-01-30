var firebaseRef = new Firebase("https://bounty-hunter.firebaseio.com/");
var list = firebaseRef.child("listings");

function addIndex(picture, location, money, date, title, type, desc){
    list.child(title).set({
        picture: picture,
        location: location,
        money: money,
        date: date,
        type: type,
        desc: desc
    });
}

function readIndex() {
    list.orderByChild("date").limitToFirst(10).on("value", function(snapshot){
        var database=snapshot.val();
        var picture=database.picture;
        var location=database.location;
        var money= database.money;
        var date= database.date;
        var type=database.type;
        var desc=database.desc;
    //put these vars somewhere, idk where
    var mainPage = $("#list-entry1");
    mainPage.add(date);
    });
};



// ****** Model ***********
// ************************
// In handling data, we manipulate the Listing object. 
function Listing (date, desc, loc, money, photo, title, type) {
    this.date = date;
    this.desc = desc;
    this.loc = loc;
    this.money = money;
    this.photo = photo;
    this.title = title;
    this.type = type;
}

// Create
Listing.prototype.create = function() {
    
};

// Read
Listing.prototype.read = function() {
    
};

// Update
Listing.prototype.update = function() {
    
};

// Delete
Listing.prototype.delete = function() {
    
};



// ****** View ************
// ************************
function displayListing (listing) {
    var posts = document.getElementById("posts");
    
    var listItem = document.createElement("a");
    listItem.className = "list-group-item";
    // listItem.innerHTML = "test";
    listItem.innerHTML = listing.title;
    listItem.href = "http://bit.ly/4kb77v";
    
    posts.appendChild(listItem);
}





// ****** Controller ******
// ************************






// ****** Testing *********
// ************************
var listing = new Listing (2/2/2, "hairy stuff", "Santa Cruz", 40, "empty", "Lost Hair", "LF");
for (var i = 0; i < 10; i++) {
    displayListing(listing);    
}
