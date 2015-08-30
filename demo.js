var demoSheet = function () {
  "use strict";

  
//clears the rows of their current content
  function _clear() {
    var thead = document.querySelector("thead tr"),
      tbody = document.getElementsByTagName("tbody");

    while(thead.firstChild) {
      thead.removeChild(thead.firstChild);
    }

    while(tbody[0].firstChild) {
      tbody[0].removeChild(tbody[0].firstChild);
    }
  }

//calculates the number of cells with data and adds them to the columns array
  function _getNumOfColumns(cells) {
    var columns = [],
      found, val;

    for (var i = 0; i < cells.length; i += 1) {
      val = parseInt(cells[i].gs$cell.col, 10);
      found = columns.some(function (col) {
        return col === val;
      });

      if (!found) {
        columns.push(val);
      }
    }

    return columns.length;
  }

//creates and array for the header cells and adds the data from the header cells of the spreadsheet
  function _applyHeaderRow(cells, numOfColumns) {
    var thead = document.querySelector("thead tr"),
      fragment = document.createDocumentFragment(),
      titles = [],
      th;

    // loop through cells data and construct table header markup
    for (var i = 0; i < numOfColumns; i += 1) {
      th = document.createElement("th");
      th.innerHTML = (cells[i]) ?  cells[i].gs$cell.$t : "";

      titles.push(th);
    }

    titles.forEach(function (title) {
      fragment.appendChild(title);
    });

    thead.appendChild(fragment);
  }

//creates an array for the contents of the cells and adds the data from the spreadsheet
  function _getRow(cells, numOfColumns, index) {
    var fragment = document.createDocumentFragment(),
      contents = [],
      tr = document.createElement("tr"),
      td;

// loops through cell data and constructs row markup
    for (var i = index; i < (index + numOfColumns); i += 1) {
      td = document.createElement("td");
      td.innerHTML = (cells[i]) ? cells[i].gs$cell.$t : "";

      contents.push(td);
    }

    contents.forEach(function (content) {
      tr.appendChild(content);
    });

    fragment.appendChild(tr);

    return fragment;
  }

//builds up the rows in the body of the table
  function _build(cells) {
    var numOfColumns = _getNumOfColumns(cells),
      tbody = document.getElementsByTagName("tbody"),
      fragment = document.createDocumentFragment(),
      rows = [],
      row;

    _applyHeaderRow(cells, numOfColumns);

    for (var i = numOfColumns; i < cells.length; i += numOfColumns) {
      row = _getRow(cells, numOfColumns, i);
      rows.push(row);
    }

    rows.forEach(function (r) {
      fragment.appendChild(r);
    });

    tbody[0].appendChild(fragment);
  }

//initializes the code to construct the demo table
  function init() {
    // reference to rise-google-sheet element
    var googleSheet = document.querySelector("rise-google-sheet");

    // register for the "rise-google-sheet-response" event that rise-google-sheet fires
    googleSheet.addEventListener("rise-google-sheet-response", function(e) {

      _clear();

      // build the table content with the worksheet data
      _build(e.detail.cells);

    });

    // execute making a request for the Google Sheet data
    googleSheet.go();
  }

  return {
    "init": init
  };
};
