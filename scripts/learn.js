var selectables = document.getElementsByClassName('selectable');
var api;
var elementID;

addCollapsibleElements();
loadPage(localStorage.getItem("src"), localStorage.getItem("id"), localStorage.getItem("api"));
setAPIButtonTarget();

function resizeIframe() {
  document.getElementById('doc-window').style.height = document.getElementById('doc-window').contentWindow.document.body.scrollHeight + 'px';
}


// Adds a nested element to any element that has the `collapsible` class.
function addCollapsibleElements() {
  var coll = document.getElementsByClassName('collapsible');
  var items = document.getElementsByClassName('nested-sidebar-list');
  for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        for (var j = 0; j < items.length; j++) {
          if (items[j].style.display === "block" && items[j] !== content) {
            items[j].style.display = "none";
          }
        }
        content.style.display = "block";
      }
    });
  }
}

// Assigns the `active` class to the currently selected sidebar element.
function removeActiveSidebarElement() {
  for (var j = 0; j < selectables.length; j++) {
    if (selectables[j].classList.contains('active')) {
      selectables[j].classList.remove('active');
    }
  }
}

// Updates the API Reference button's link destination.
function setAPIButtonTarget() {
  for (var x = 0; x < selectables.length; x++) {
    selectables[x].addEventListener("click", function() {
      var button = document.getElementById('api-button');
      button.setAttribute('onclick', "window.open('" + localStorage.getItem('api') + "')");
    });
  }
}

function loadPage(src, id, api) {
  localStorage.setItem("src", src);
  localStorage.setItem("id", id);
  localStorage.setItem("api", api);
  removeActiveSidebarElement();
  document.getElementById(id).classList.add('active');
  document.getElementById('doc-window').setAttribute('src', src);
}
