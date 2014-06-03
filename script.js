var dict = {};

dict["g"] = {  "title" : "Google",
                "keyword" : "g",
                "string" : "https://www.google.com/#q=#{query}&safe=off" };

dict["y"] = {  "title" : "YouTube",
                "keyword" : "y",
                "string" : "https://www.youtube.com/results?search_query=#{query}" };

dict["n"] = {  "title" : "Nihongomaster",
                "keyword" : "n",
                "string" : "http://www.nihongomaster.com/dictionary/search/?q=#{query}&type=j" };

var selectedEngine = dict["g"];

function search(caller) {
    var query = caller.value;
    window.location = selectedEngine["string"].replace("#{query}", query);
}

var sucher = document.getElementById("sucher");
sucher.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(this);       
    }
    if (e.keyCode === 9) {  // TAB        
        selectedEngine = dict[this.value];
        this.value = dict[this.value]["title"];
    }
});

var suchers = document.getElementById("suchers");
suchers.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(this);       
    }
    if (e.keyCode === 9) {  // TAB
        document.getElementById("linkasd").focus(); // hack because focus jumps to next field on TAB
    }
});
