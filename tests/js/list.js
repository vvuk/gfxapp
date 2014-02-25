var template = document.getElementById("template");
var itemHeight = template.clientHeight;
// The template should not be rendered, so take it out of the document.
document.body.removeChild(template);
// Remove its "id" attribute now so that that attribute doesn't get cloned
// into all the items.
template.removeAttribute("id");

// Make sure we can scroll the required distance.
scrolledChild.style.height = itemHeight*numItems + "px";

// Indexed by item number, the item elements currently in the DOM.
var itemsInDOM = [];
var lastScrollPos = getScrollPos();

function generateItems(displayPortMarginMultiplier) {
  var scrollPos = getScrollPos();
  var scrollPortHeight = getScrollPortHeight();
  // Determine which items we *need* to have in the DOM. displayPortMargin
  // is somewhat arbitrary. If there is fast async scrolling, increase
  // displayPortMarginMultiplier to make sure more items can be prerendered. If
  // populateItem triggers slow async activity (e.g. image loading or
  // database queries to fill in an item), increase displayPortMarginMultiplier
  // to reduce the likelihood of the user seeing incomplete items.
  var displayPortMargin = displayPortMarginMultiplier*scrollPortHeight;
  var startIndex = Math.max(0,
    Math.floor((scrollPos - displayPortMargin)/itemHeight));
  var endIndex = Math.min(numItems,
    Math.ceil((scrollPos + scrollPortHeight + displayPortMargin)/itemHeight));

  // indices of items which are eligible for recycling
  var recyclableItems = [];
  for (var i in itemsInDOM) {
    if (i < startIndex || i >= endIndex) {
      recyclableItems.push(i);
    }
  }
  recyclableItems.sort();

  for (var i = startIndex; i < endIndex; ++i) {
    if (itemsInDOM[i]) {
      continue;
    }
    var item;
    if (recyclableItems.length > 0) {
      var recycleIndex;
      // Delete the item furthest from the direction we're scrolling toward
      if (scrollPos >= lastScrollPos) {
        recycleIndex = recyclableItems.shift();
      } else {
        recycleIndex = recyclableItems.pop();
      }
      item = itemsInDOM[recycleIndex];
      delete itemsInDOM[recycleIndex];

      // NOTE: We must detach and reattach the node even though we are
      //       essentially just repositioning it.  This avoid pathological
      //       layerization behavior where each item gets assigned its own
      //       layer.
      scrolledChild.removeChild(item);
    } else {
      item = template.cloneNode(true);
    }
    populateItem(item, i);
    item.style.top = i*itemHeight + "px";
    itemsInDOM[i] = item;
    scrolledChild.appendChild(item);
  }

  lastScrollPos = scrollPos;
}

function fixupItems() {
  // Synchronously generate all the items that are immediately or nearly visible
  generateItems(1);
  // Asynchronously generate the other items for the displayport
  setTimeout(function() {
    generateItems(4);
  }, 0);
}

fixupItems();
scrollEventNode.addEventListener("scroll", fixupItems);
scrollEventNode.addEventListener("resize", fixupItems);
