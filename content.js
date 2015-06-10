/*If an extension needs to interact with web pages that the user loads (as opposed to pages that are included in the extension), then the extension must use a content script.*/

//we do not need jquery to check if the document is loaded
//Chrome injects content scripts after the DOM is complete

//alert("Hello world");
//var fistHref = $("a[href^='http']").eq(0).attr("href");
//console.log(fistHref);

//now listen for the message passed from background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message === "clicked_browser_action"){
      var firstHref = $("a[href^='http']").eq(0).attr("href");
      debugger;
      //console.log(firstHref);
      console.log("hello");

      //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});

      chrome.runtime.sendMessage({"message": "init_bookmark"});
    }
  }
)

$(document).ready(function(){
  $("#remove_all_button").click(function(){
    //alert("test");
    chrome.runtime.sendMessage({message: "remove_all_bookmarks"});
  });

  $("#revert_all_button").click(function(){
    alert("test");
    chrome.runtime.sendMessage({message: "revert_all_bookmarks"});
  });
});
