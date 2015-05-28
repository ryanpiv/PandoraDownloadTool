// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

    debugger;
    //get bookmarks and process each bookmark
    chrome.bookmarks.getTree(function(itemTree){
      itemTree.forEach(function(item){
        processNode(item);
      });
    });
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message === "open_new_tab") {
      chrome.tabs.create({"url": request.url});
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
