var googleOld = "https://www.google.com/#q=#{query}&safe=off"
var youtubeOld = "https://www.youtube.com/results?search_query=#{query}"
var nihongomasterOld = "http://www.nihongomaster.com/dictionary/search/?q=#{query}&type=j"



var google = {  "title" : "Google",
                "keyword" : "g",
                "string" : "https://www.google.com/#q=#{query}&safe=off" };

var youtube = {  "title" : "YouTube",
                "keyword" : "y",
                "string" : "https://www.youtube.com/results?search_query=#{query}" };

var nihongomaster = {  "title" : "Nihongomaster",
                "keyword" : "n",
                "string" : "http://www.nihongomaster.com/dictionary/search/?q=#{query}&type=j" };

var dict = {};

dict["g"] = google;
dict["y"] = youtube;
dict["n"] = nihongomaster;

var engine = dict["n"];

function search(e) {
    var query = e.value;
    window.location = engine["string"].replace("#{query}", query);
}

var sucher = document.getElementById("sucher");
sucher.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(this);       
    }
    if (e.keyCode === 9) {  // TAB        
        engine = dict[this.value];
        this.value = dict[this.value]["title"];
    }
});

var suchers = document.getElementById("suchers");
suchers.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(this);       
    }
    if (e.keyCode === 9) {  // TAB
        
    }
});
