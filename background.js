// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   var activeTab = tabs[0];
  //   chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

    //debugger;
    //get bookmarks and process each bookmark
    // chrome.bookmarks.getTree(function(itemTree){
    //   itemTree.forEach(function(item){
    //     processNode(item);
    //   });
    // });

    console.log("listing bookmarks");
    chrome.bookmarks.getTree( process_bookmarks );
  //});
});

function process_bookmarks(bookmarks)
{
  debugger;
  for (var i=0; i<bookmarks.length; i++)
  {
    console.log(bookmarks);
    console.log(bookmarks[0].children.length);

    for (var y=0; y<bookmarks[i].children.length; y++)
    {
      var id = bookmarks[i].children[y].id;
      console.log(bookmarks[i].children[y].id);

      for (var x=0; x<bookmarks[i].children[y].children.length; x++)
      {
        //set all bookmark title logic here
        if(bookmarks[i].children[y].children[x].title=="Google")
        {
          //Removes a bookmark
          //chrome.bookmarks.remove(bookmarks[i].children[y].children[x].id);


        }
      }
    }
  }
}











chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message === "open_new_tab") {
      chrome.tabs.create({"url": request.url});
    }
    if(request.message === "init_bookmark") {
      debugger;
      chrome.bookmarks.getTree(function(processNode){
        itemTree.forEach(function(item){
          processNode(item);
        });
      });
    }
  }
)

function processNode(node){
  if(node.children){
    node.children.forEach(function(child){
      processNode(child);
    });
  }

  if(node.url) {
    console.log(node.url);
  }
}
