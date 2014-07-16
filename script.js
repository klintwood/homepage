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

// select Google by default
var selectedEngine = engines["g"];

// fire search

function search(caller) {
    var query = caller.value;
    window.location = selectedEngine["string"].replace("#{query}", query);
}

var sucher = document.getElementById("sucher");
sucher.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  // ENTER
        var input = this.value;
        if (input.match(/^\S*\.\S*$/))     // if input looks like URL, redirect
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


// Hacker News
// use this instead of unreliable api: http://whateverorigin.org/

function yourFunction(json) {
    //alert(json['items'][0]['id']);
    var items = json['items'];
    for (var i = 0; i < 30; i++) {
        var item = items[i];
        var id = item['id'];
        var title = item['title'];
        var comment_count = item['commentCount'];
        var link = '<a href="https://news.ycombinator.com/item?id=' + id + '">' + title + ' <b>(' + comment_count + ')</b></a>';
        $('ul#hacker_news').append('<li>' + link + '</li>');
    }
}


// Simple time display
// taken from: http://stackoverflow.com/questions/6787374/how-to-display-system-time
function updateTime() {
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        if (minutes < 10){
            minutes = "0" + minutes;
        }

        var v = hours + ":" + minutes + " ";
        setTimeout("updateTime()", 1000);
        document.getElementById('time').innerHTML=v;
}
updateTime();




// locally store Pinned / Hidden items
/*
http://www.webdirections.org/blog/webstorage-persistent-client-side-data-storage/
http://html5doctor.com/storing-data-the-simple-html5-way-and-a-few-tricks-you-might-not-have-known/
http://diveintohtml5.info/storage.html */
if (window.localStorage) {
    //window.localStorage.clear();
    var hiddenAndroids = JSON.parse(window.localStorage.getItem("android"));
    var hiddenOculus = JSON.parse(window.localStorage.getItem("oculus"));
} 

if (!hiddenAndroids) {
    var hiddenAndroids = [];
}

if (!hiddenOculus) {
    var hiddenOculus = [];
}



// Reddit page
// Fetch the 30 hottest posts on /r/Android
/*
reddit.hot('Android').limit(30).fetch(function(res) {
    // res contains JSON parsed response from Reddit    
    var posts = res.data.children;

    // loop through posts and create and entry for each
    for (var ind in posts) {
        var post = posts[ind].data;
        //console.log(post.id);
        //console.log(hiddenAndroids);
        if (hiddenAndroids.indexOf(post.id) == -1) { // Only show if id not found in hidden list
            //console.log(post);
            var link = '<p id="' + post.id + '"><span class="remove_news"> X </span><a href="http://reddit.com' + post.permalink + '" title="' + post.title + '">' + crop_title(post.title) + ' <b>(' + post.num_comments + ')</b></a></p>';
         //   $('ul#reddit').append('<li>' + link + '</li>');
            $('ul#reddit ul#android').append('<li>' + link + '</li>');
        }

    }
    // Hide item on click event
    $("span").click(function() {
        hiddenAndroids.push($(this).parent().attr("id"));
        window.localStorage.setItem("android", JSON.stringify(hiddenAndroids));
        //console.log(hiddenAndroids);
        //console.log($(this).parent().attr("id"));
        //console.log(hiddenAndroids);
        $(this).parent().slideUp();
    });
});
// Oculus
reddit.hot('Oculus').limit(30).fetch(function(res) {
    // res contains JSON parsed response from Reddit    
    var posts = res.data.children;

    // loop through posts and create and entry for each
    for (var ind in posts) {
        var post = posts[ind].data;
        //console.log(post.id);
        //console.log(hiddenAndroids);
        if (hiddenOculus.indexOf(post.id) == -1) { // Only show if id not found in hidden list
            //console.log(post);
            var link = '<p id="' + post.id + '"><span class="remove_news"> X </span><a href="http://reddit.com' + post.permalink + '" title="' + post.title + '">' + crop_title(post.title) + ' <b>(' + post.num_comments + ')</b></a></p>';
          //  $('ul#reddit').append('<li>' + link + '</li>');
            $('ul#reddit ul#oculus').append('<li>' + link + '</li>');
        }

    }
    // Hide item on click event
    $("span").click(function() {
        hiddenOculus.push($(this).parent().attr("id"));
        window.localStorage.setItem("oculus", JSON.stringify(hiddenOculus
));
        //console.log(hiddenAndroids);
        //console.log($(this).parent().attr("id"));
        //console.log(hiddenAndroids);
        $(this).parent().slideUp();
    });
});*/

// generalized reddit function
function addSubreddit(subName) {
    if (window.localStorage) {
        //window.localStorage.clear();
        var hiddenItems = JSON.parse(window.localStorage.getItem(subName));
    } 

    if (!hiddenItems) {
        var hiddenItems = [];
    }
    reddit.hot(subName).limit(30).fetch(function(res) {
        // res contains JSON parsed response from Reddit    
        var posts = res.data.children;

        // loop through posts and create and entry for each
        for (var ind in posts) {
            var post = posts[ind].data;

            if (hiddenItems.indexOf(post.id) == -1) { // Only show if id not found in hidden list
                var link = '<p id="' + post.id + '"><span class="remove_news"> X </span><a href="http://reddit.com' + post.permalink + '" title="' + post.title + '">' + crop_title(post.title) + ' <b>(' + post.num_comments + ')</b></a></p>';
                $(('ul#reddit ul#' + subName)).append('<li>' + link + '</li>');
            }

        }
        // Hide item on click event
        $("span").click(function() {
            hiddenItems.push($(this).parent().attr("id"));
            window.localStorage.setItem(subName, JSON.stringify(hiddenItems));
            $(this).parent().slideUp();
        });
    });
    
}

addSubreddit("pcgaming");
addSubreddit("android");
addSubreddit("oculus");


function crop_title(title) {
    //console.log(title.length);
    if (title.length > 70) {
        title = title.substr(0, 67);
        title += "...";
    }
    return title;
}






  