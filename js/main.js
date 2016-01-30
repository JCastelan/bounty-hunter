
var firebaseRef = new Firebase("https://bounty-hunter.firebaseio.com/");
var list = firebaseRef.child("listings");
/*
function addIndex(picture, location, money, date, title, type, desc){
    list.push({
        picture: "pictureurl",
        location: "location",
        money: "money",
        date: "date",
        title: "title"
        type: "type",
        desc: "desc"
    })
    
}*/
firebaseRef.child("test2").push({
        picture: "pictureurl",
        location: "location",
        money: "money",
        date: "date",
        title: "title",
        type: "type",
        desc: "desc"
});
