var google = "https://www.google.com/#q=#{query}&safe=off"
var youtube = "https://www.youtube.com/results?search_query=#{query}"

var sucher = document.getElementById("sucher");
sucher.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(e);    	
    }
    if (e.keyCode === 9) {  // TAB        
        
    }
});

function search(e) {
    var query = document.getElementById("sucher").value;
    window.location = google.replace("#{query}", query);
}


var suchers = document.getElementById("suchers");
suchers.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search2(e);    	
    }
    if (e.keyCode === 9) {  // TAB
               
    }
});

function search2(e) {
    var query = document.getElementById("suchers").value;
    window.location = "https://www.google.com/#q=" + query + "&safe=off";
}