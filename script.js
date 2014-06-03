var google = "https://www.google.com/#q=#{query}&safe=off"
var youtube = "https://www.youtube.com/results?search_query=#{query}"
var nihongomaster = "http://www.nihongomaster.com/dictionary/search/?q=#{query}&type=j"

function search(e) {
    var query = e.value;
    window.location = google.replace("#{query}", query);
}

var sucher = document.getElementById("sucher");
sucher.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(this);    	
    }
    if (e.keyCode === 9) {  // TAB        
        
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
