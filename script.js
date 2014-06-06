var engines = {};

engines["g"] = {  "title" : "Google", "keyword" : "g",
                "string" : "https://www.google.com/#q=#{query}&safe=off" };
engines["y"] = {  "title" : "YouTube", "keyword" : "y",
                "string" : "https://www.youtube.com/results?search_query=#{query}" };
engines["n"] = {  "title" : "Nihongomaster", "keyword" : "n",
                "string" : "http://www.nihongomaster.com/dictionary/search/?q=#{query}&type=j" };
engines["w"] = {  "title" : "Wikipedia", "keyword" : "w",
                "string" : "http://en.wikipedia.org/w/index.php?title=Special:Search&search=#{query}" };
engines["a"] = {  "title" : "Amazon", "keyword" : "a",
                "string" : "http://www.amazon.de/s/url=search-alias%3Daps&field-keywords=#{query}" };
engines["p"] = {  "title" : "Pons", "keyword" : "p",
                "string" : " http://de.pons.com/%C3%BCbersetzung?q=#{query}&l=deen" };

https://www.google.de/maps/search/Osterfeldstr.+30-40/@51.1758057,10.4541194,6z/data=!3m1!4b1

    

var selectedEngine = engines["g"];

function search(caller) {
    var query = caller.value;
    window.location = selectedEngine["string"].replace("#{query}", query);
}

var sucher = document.getElementById("sucher");
sucher.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        var input = this.value;
        if (input.match(/^\S*\.\S*$/))     // if URL entered, redirect
            if (input.match(/^https?:\/\//))             // only add "http://" if not already in input
                window.location = input;
            else
             window.location = "http://" + input;
        else                                    // otherwise, search
            search(this);       
    }
    if (e.keyCode === 9) {  // TAB        
        selectedEngine = engines[this.value];
        this.value = engines[this.value]["title"];
    }
    //console.log(selectedEngine["string"].replace("#{query}", this.value));
});

var suchers = document.getElementById("suchers");
suchers.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        search(this);       
    }
    if (e.keyCode === 9) {  // TAB
        document.getElementById("linkasd").focus(); // hack because focus jumps to next field on TAB
    }
    //console.log(selectedEngine["string"].replace("#{query}", this.value));
});
