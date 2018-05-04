<script>
	//turns search icon into a button that grabs the input in the searchbar

var count = 0;
document.getElementById("searchicon").addEventListener("click", function() {
  
  count++;
  // stores the searchbar input in a variable called searchInput
  let searchInput = document.getElementById("wikiSearchInput").value;

  //takes text from inside searchbar and creates a URL to query the Wiki API for results
  //replace function is used to replace whitespace in searchInput with %20 which is needed to create a properly formatted URL for the query
  let wikiURL =
    "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" +
    searchInput.replace(/ /g, "%20") + "&limit=7";

  var xhr = new XMLHttpRequest(),
    method = "GET",
    url = wikiURL;

  xhr.open(method, url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      //parses JSON string to useable data and stores in constant myDataObject
      let myDataObject = JSON.parse(xhr.responseText);

      //creates new HTML elements for each result returned by the wikipedia API searc
 function addElement() {
   for (let x = 0; x < myDataObject[1].length; x++) {
     let newDiv = document.createElement("div");
     newDiv.className += "results";
     let firstTitle = document.createTextNode(myDataObject[1][x]);
     document.body.appendChild(newDiv);
     newDiv.appendChild(firstTitle);
     let snippet = document.createTextNode(": " + myDataObject[2][x]);
     newDiv.appendChild(snippet);
   }
 };
     if (count == 1) {
       addElement();
     }
      
  // function replaceElement() {
  //   for (let i = 0; i < myDataObject[1].length; i++){
  //     newDiv.replaceChild(myDataObject[1][i]);
  //   }
  // };     
  //   if (count > 2) {
  //     replaceElement();
  //   }   
       
    }
       
  };
  xhr.send();
    

//when finished this will push the search box to the top of the page once results are returned to give the webpage a cleaner look
  document.getElementById("box").style.marginTop = "3%";

 
});

</script>	