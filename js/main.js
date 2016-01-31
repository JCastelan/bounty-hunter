var firebaseRef = new Firebase("https://bounty-hunter.firebaseio.com/");
var listRef = firebaseRef.child("listings");



// ****** Model ***********
// ************************

// In handling data, we manipulate the Listing object. 
function Listing (contact, date, desc, loc, money, photo, title, type) {
	this.contact = contact;
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
	
	var listingHeader = $("<h3>",{id:"listHeader"});
	var listingBox = $("<div>",{id:"listBox"});
	listings.append(listingHeader);
    listings.append(listingBox);
    
    var listingTitle = $("<p>",{id:"listTitle"});
    listingTitle.append($("<b>").append(listing.title));
	listingHeader.append(listingTitle);
    
    var listingDate =$("<span>",{id:"listDate"});
    listingDate.append("Date:"+listing.date);
	listingHeader.append(listingDate);
    
    var listingLoc =$("<span>",{id:"listLoc"});
    listingLoc.append(listing.loc);
	listingHeader.append(listingLoc);
	
    var listingDesc =$("<spanp>",{id:"listDesc"});
    listingDesc.append(listing.desc);
	
    var listingDescbox =$("<div>",{id:"listDescbox"});
	listingDescbox.append(listingDesc);
    var listingContact =$("<p>",{id:"listContact"});
    listingContact.append("Contact: "+listing.contact);
	listingDescbox.append(listingContact);
	
    var listingType =$("<span>",{id:"listType"});
    listingType.append("Type of Crime: "+listing.type);
	listingHeader.append(listingType);
	
    var listingPhoto =$("<img>",{id:"listPhoto",src:listing.photo});
	listingDescbox.append(listingPhoto);
	listingBox.append(listingDescbox);
	
    var listingMoney =$("<p>",{id:"listMoney"});
    listingMoney.append("Reward: $"+listing.money);
	listingBox.append(listingMoney);
	
	var fackbook =$("<div>",{class:"fb-share-button"});
	fackbook.attr("data-href",document.url);
	fackbook.attr("data-layout","button_count");
	listingTitle.append(fackbook);
	
	var gogle =$("<div>",{class:"g-plusone"});
	gogle.attr("data-href",document.url);
	listingTitle.append(gogle);
	
	var twater =$("<a>",{class:"twitter-share-button"});
	twater.attr("href","https://twitter.com/intent/tweet?url="+document.url);
	listingTitle.append(twater);
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
		$('#contact').val(),
		$('#date').val(),
		$('#desc').val(), 
		$('#loc').val(), 
		$('#money').val(), 
		$('#photo').val(),
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
		console.log(snapshot.val());
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



// var testListings = 10;
// listRef.set({}); // clear db for testing
// for (var i = 0; i < testListings; i++) {
// 	var listing = new Listing (
// 		"hairluver4lyf3@ymail.edu",
// 		"2000-2-30", 
// 		"I lost a bunch of my hair! I love my hair so much; I need it back!",
// 		"Santa Cruz", 
// 		Math.round(Math.random()*40), 
// 		"https://i.ytimg.com/vi/oM1EVAYahFE/maxresdefault.jpg", 
// 		"Lost Hair " + i, 
// 		"LF"
// 	);
// 	addToFB(listing);
// }

var sort=$("#sort").val();
readAllFromFBList();
//readSpecificFromFBList(1, 2);

