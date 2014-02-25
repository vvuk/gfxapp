// Set the number of items you want in your list here. Dynamically changing the
// number of items is not supported but would be easy to add.
var numItems = 100000;
// Change this function to control what gets created for each item. "element"
// is a copy of the template element (which may have been previously used with
// another index, so make sure you reset any contents which may have been set
// by a previous call to populateItem).
// You could do almost anything you want here. You could even dynamically
// create additional child elements (but don't forget to remove them when the
// element is reused for another index). You could make fields editable, or
// load images, etc etc etc.
// In a more realistic example, this would fetch data from an in-memory
// database. Or, you could replace the item fields with placeholders (e.g.
// "loading..."), issue an async database query to get the data, and fill in
// the item DOM when the query completes.
function populateItem(element, index) {
  var image = element.firstChild;
  var name = image.nextSibling;
  var number = name.nextSibling;
 
  var hue = (index*1000)%360;
  image.style.backgroundColor = "hsl(" + hue + ",100%,90%)";
  name.firstChild.data = "Made Up Name #" + index;
  number.firstChild.data = "0800 11" + index;
}

// This demo scrolls the whole document. To change it to scroll an overflow:auto
// element, you would just need to replace these functions here with something
// else.
var scrolledChild = document.getElementById("inner");
var scrollEventNode = document.getElementById("outer");
function getScrollPos() { return scrollEventNode.scrollTop; }
function getScrollPortHeight() { return scrollEventNode.clientHeight; }
