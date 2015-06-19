// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  // use this when sending a message to the content script that is not a response of a message being received from content script
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
    debugger;
    var strHTML = '<ul>';

    console.log("listing bookmarks");
    for (var i=0; i<bookmarks.length; i++)
    {
      for (var y=0; y<bookmarks[i].children.length; y++)
      {
        for (var x=0; x<bookmarks[i].children[y].children.length; x++)
        {
          //set all bookmark title logic here
          var id = bookmarks[i].children[y].children[x].id;
          var title = bookmarks[i].children[y].children[x].title;

          strHTML += '<li><input type="checkbox" name="' + id + '" value="' + title + '></li>';

          chrome.bookmarks.update(String(id), {
            title: ''
          });
        }
      }
    }
    strHML += ' </ul>';
    $("div_checklist").append(strHML);
  //});
});


//Currently, this extension removes all bookmark titles
//To do:
//Medium: Add recursive functionality to grab 'oldtitle' and change title back to what it was before
//Medium: Add buttons to either remove all or revert all bookmark titles
//Large: Create dynamic checkbox list to allow users to select which bookmarks they want titles removed from
//Will need to decipher between removing titles from folders and bookmarks, etc.

function remove_all_titles(bookmarks)
{
  debugger;
  for (var i=0; i<bookmarks.length; i++)
  {
    //console.log(bookmarks);
    //console.log(bookmarks[0].children.length);

    for (var y=0; y<bookmarks[i].children.length; y++)
    {
      var id = bookmarks[i].children[y].id;
      //console.log(bookmarks[i].children[y].id);

      for (var x=0; x<bookmarks[i].children[y].children.length; x++)
      {
        //set all bookmark title logic here
        bookmarks[i].children[y].children[x].oldtitle = bookmarks[i].children[y].children[x].title;
        var id = bookmarks[i].children[y].children[x].id;

        chrome.bookmarks.update(String(id), {
          title: ''
        });
        /*if(bookmarks[i].children[y].children[x].title=="Google")
        {
          //Removes a bookmark
          //chrome.bookmarks.remove(bookmarks[i].children[y].children[x].id);
        }*/
      }
    }
  }
}

function revert_all_titles(bookmarks) {
  debugger;
  for (var i=0; i<bookmarks.length; i++)
  {
    console.log(bookmarks);
    //console.log(bookmarks[0].children.length);

    for (var y=0; y<bookmarks[i].children.length; y++)
    {
      var id = bookmarks[i].children[y].id;
      //console.log(bookmarks[i].children[y].id);

      for (var x=0; x<bookmarks[i].children[y].children.length; x++)
      {
        //set all bookmark title logic here
        var id = bookmarks[i].children[y].children[x].id;

        chrome.bookmarks.update(String(id), {
          title: bookmarks[i].children[y].children[x].oldtitle
        });
        /*if(bookmarks[i].children[y].children[x].title=="Google")
        {
          //Removes a bookmark
          //chrome.bookmarks.remove(bookmarks[i].children[y].children[x].id);
        }*/
      }
    }
  }
}

function remove_one_title(bookmarks, title, id) {

}

function revert_one_title(bookmarks, title, id){

}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.message === "remove_all_bookmarks") {
      //chrome.tabs.create({"url": request.url});
      chrome.bookmarks.getTree( remove_all_titles );
    }
    if(request.message === "revert_all_bookmarks") {
      chrome.bookmarks.getTree( revert_all_titles );
    }
  });
