var firebaseRef = new Firebase("https://bounty-hunter.firebaseio.com/");
var listRef = firebaseRef.child("listings");



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

// Delete
Listing.prototype.delete = function () {
	
};

// Create
Listing.prototype.create = function () {
	
};

// Read
Listing.prototype.read = function () {
	
};

// Update
Listing.prototype.update = function () {
	
};





// ****** View ************
// ************************

function displayListing (listing) {
    var listings = $('#listings');
	
	var listingHeader = $("<h3>");
	var listingBox = $("<div>");
	listings.append(listingHeader);
    listings.append(listingBox);
    
    var listingTitle = $("<p>",{id:"listTitle"});
    listingTitle.append($("<b>").append(listing.title));
	listingHeader.append(listingTitle);
    
    var listingDate =$("<p>",{id:"listDate"});
    listingDate.append(listing.date);
	listingHeader.append("Date:"+listingDate);
    
    var listingLoc =$("<p>",{id:"listLoc"});
    listingLoc.append(listing.loc);
	listingHeader.append(listingLoc);
	
    var listingDesc =$("<p>",{id:"listDesc"});
    listingDesc.append(listing.desc);
	listingBox.append(listingDesc);
	
    var listingType =$("<p>",{id:"listType"});
    listingType.append(listing.type);
	listingBox.append(listingType);
	
    var listingMoney =$("<p>",{id:"listMoney"});
    listingMoney.append(listing.money);
	listingBox.append(listingMoney);
}

function displayDetail (listing) {
	document.getElementById("date").textContent = listing.date;
	document.getElementById("desc").textContent = listing.desc;
	document.getElementById("loc").textContent = listing.loc;
	document.getElementById("money").textContent = listing.money;
	document.getElementById("photo").textContent = listing.photo;
	document.getElementById("title").textContent = listing.title;
	document.getElementById("type").textContent = listing.type
}





// ****** Controller ******
// ************************

//read from create page
function createNewListing () {
	var listing = new Listing (
		$('#date').val(),
		$('#desc').val(), 
		$('#loc').val(), 
		$('#money').val(), 
		//$('#photo').val(), 
		"photo",
		$('#title').val(), 
		$('input[name=radiobtn]:checked').val()
	);
	addToFB(listing);
}

//add a listing to the Firebase
function addToFB (listing) {
	listRef.push(listing);
}

//read all entries from firebaseRef
function readAllFromFBList () {
	listRef.on("child_added", function(snapshot) {
		displayListing(snapshot.val());
	});
}

//read specific number of entries 
function readSpecificFromFBList (start, end) {
	listRef.orderByKey().startAt(start).endAt(end).on("child_added", function(snapshot) {
		displayListing(snapshot.val());
	});
}

function readFromFBSingle (key) {
	listRef.orderByKey().equalTo(key).once("value", function(snapshot) {
		displayDetail(snapshot.val());
	});
}

function removeFromFB (key) {
	listRef.orderByKey().equalTo(key).once("value", function(snapshot) {
		snapshot.remove();
	});
}


// ****** Testing *********
// ************************

// for (var i = 0; i < 10; i++) {
// 	var listing = new Listing ("2000-2-30", "hairy stuff", "Santa Cruz", 40, "empty", "Lost Hair " + i, "LF");
// 	displayListing(listing);
// }

var testListings = 10;
listRef.set({}); // clear db for testing
for (var i = 0; i < testListings; i++) {
	var listing = new Listing (2000-2-30, "hairy stuff", "Santa Cruz", 40, "empty", "Lost Hair " + i, "LF");
	addToFB(listing);
}

readAllFromFBList();
//readSpecificFromFBList(1, 2);

