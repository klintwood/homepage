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
        var link = '<a href="https://news.ycombinator.com/item?id=' + id + '">' + title + ' (' + comment_count + ')</a>';
        $('ul#hacker_news').append('<li>' + link + '</li>');
    }
}


// http://usamadar.com/2012/06/24/getting-around-browsers-same-origin-policy-sop-with-proxies-script-injection-jsonp-and-cors/
//httpGet('http://api.ihackernews.com/page?format=jsonp&callback=yourFunction');






/*







function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

 function loadXMLDoc(theURL)
    {
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                alert(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET",theURL,true);
        xmlhttp.send();
    }





var latest_stories = httpGet('https://hn.algolia.com/api/v1/search_by_date?tags=story');
alert(typeof JSON.parse(latest_stories['hits']));






var frontpage = loadXMLDoc('http://whateverorigin.org/get?url=https://news.ycombinator.com/');
var posts = frontpage.match(/https:\/\/news.ycombinator.com\/item\?id=(\d*)/);
alert(posts);



$.ajax({
    url: "http://api.ihackernews.com/page",
    data: null,
    success: function(data) {
       alert('page content: ' + data);
    },
    dataType: 'jsonp'
});



var request = makeHttpObject();
request.open("GET", "http://api.ihackernews.com/page", true);
alert(typeof request.responseText);

// http://eloquentjavascript.net/chapter14.html
function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}
*/