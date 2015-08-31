# Rise Google Sheet Demo Walkthrough

##Introduction

This walkthrough will take you through all the steps required to set up a simple demo of the `rise-google-sheet` Web Component. This demo will use the data returned by the Component to construct an HTML table, however this is just one example of how the data can be displayed. The [demo repository](https://github.com/Rise-Vision/rise-google-sheet-demo) contains the completed versions of the files that you will construct in this tutorial. 

If you have any questions or comments about this component we would love to hear from you, so please get involved with the Rise Vision Web Designer community [here](https://community.risevision.com/rise_vision_inc/categories/rise_vision_inc_web_designers), where you can also find examples of other Components for you to try out.

This walkthrough makes use of the command line and Bower to download and install the necessary Component files and dependencies. If you are not familiar with these please check out these resources before proceeding with the walkthrough:

[Introduction to the Command Line](http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything)

[Introduction to Bower](https://css-tricks.com/whats-great-bower/)

## Step 1: Installing the Component

You should first navigate to the folder where you want to install the Component. For this example we will install it in a folder named `rise-google-sheet-demo`. You can install the component and the necessary dependencies through Bower using the following command:

```
bower install https://github.com/Rise-Vision/rise-google-calendar.git
```

After running this command you should see that a folder named `src` has been downloaded. Inside this folder is the `_bower_components` folder which contains all of the files we will need to set up our page.

## Step 2: Setting up the Google Sheet

Before we start to build our page we should set up a Google spreadsheet so that the Component has some data to use. Please go to to the Google spreadsheet homepage [here](https://www.google.com/sheets/about/) and click on the ‘Sheets’ tab at the top of the page. For this demo we can use a very simple Google spreadsheet, but obviously as you experiment with using the component you can include as much data in it as you want. Here is an example of how the demo spreadsheet is set up:

![example spreadsheet](https://cloud.githubusercontent.com/assets/8008948/9567939/bf27c992-4f09-11e5-9e0a-5741c88d7c90.png)

Once you have entered the data you will need to make the spreadsheet public and grab the spreadsheet key so the Component will know where to get the data from. To do this please click on file and select ‘publish to the web...’. A pop-up modal will appear and you will be prompted to click ‘publish’ again. Please do this. You will also be shown the url of the published spreadsheet, which will look something like this:

`https://docs.google.com/spreadsheets/d/1Aopk_gdurtAdvxr5u4X9at7K0EkWDBqD3VkgJ6je5y4/pubhtml`

The spreadsheet key is the long string of numbers and letters, in this case

`1Aopk_gdurtAdvxr5u4X9at7K0EkWDBqD3VkgJ6je5y4`

Please make a note of this or copy it to your clipboard as you will need it in the next step.

## Step 3: Setting up the HTML

Once you have set up the spreadsheet it is now time to set up the HTML. For this demo we will set up our `index.html` file in the root of our demo folder. You should include `webcomponents-lite.min.js` before any code that touches the DOM. Then load the web component using HTML imports.  The head section of the HTML should look like this:

```
 <head>
...
 <script src="src/_bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
 <link rel="import" href="src/_bower_components/rise-google-sheet/rise-google-sheet.html">
...
</head>
```

You can now add the Component to the body of your HTML. This demo shows how the Component can be used to retrieve a range of data from a Google Spreadsheet. Alternative retrieval options are available. Please refer to the Component API Documentation [here](http://rise-vision.github.io/rise-google-sheet/components/rise-google-sheet/) for more information. The body of your HTML should look like this. 

```
<body>
    
<rise-google-sheet
      		key="1Aopk_gdurtAdvxr5u4X9at7K0EkWDBqD3VkgJ6je5y4" 
      	refresh="30">
</rise-google-sheet>

<!-- Initialize the Component -->
<script>
  	var sheet = document.querySelector('rise-google-sheet');

 	// Respond to events it fires.
 	sheet.addEventListener('rise-google-sheet-response', function(e) {
  		if (e.detail && e.detail.cells) {
      		console.log(e.detail.cells); // Array of cell objects
   		 }
  	});

	// Executes a request.
sheet.go();
</script>
</body>
```

Remember the spreadsheet key you copied in Step 2? This is where you need it. You can see where the Component is included using the `<rise-google-sheet>` tag. There are various attributes that apply to the component and you can see the full list in the documentation here. For this demo we just need to set two attributes, ‘key’ and ‘refresh’. The key attribute is where you enter the key from the spreadsheet that you created earlier. The refresh attribute determines how often the component will check the spreadsheet for changes. For this demo we can set it at ‘30’ which represents 30 seconds. 

The code within the `<script>` tags initializes the Component and tells it to log the content of the spreadsheet cells to the console, if the cells are populated.

You can check out the files in the demo repository at any time [here](https://github.com/Rise-Vision/rise-google-sheet-demo).

## Step 4: Check that the data is being returned

Once the basic HTML is in place we should check that everything is working. In order to view the page, we will need to have it running on a local server. If you are using a Mac you can set up a local server by entering the following command:

```
python -m SimpleHTTPServer
```

This will set up a local server at localhost:8000. If you have set up your index.html file in the root of your directory you can view it by going to `localhost:8000/index.html`

The page should still be blank, but don’t panic! If you open up the developer tools and select ‘console’ you should see the following output:

```
[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]
```

You should see an object being returned for each cell that was populated in the spreadsheet. In the example sheet there was 15 cells with text in them, so the component has returned 15 objects. Awesome, it works!

If you leave the console open, you should see these objects being logged every 30 seconds, which shows the Component’s refresh attribute is working too!

## Step 5: Setting up the HTML Table

As we said at the beginning, now that the Component is set up and returning the contents of the spreadsheet successfully, you are free to use or display this data in any way you want. For this demo we will grab this data and display it in an HTML table.

We can add the structure of the table to the HTML within the `<rise-google-sheet>` tags. We will give our table the id of “sheetTable” and add in the classes “pure-table” and “pure-table-bordered”. We will come back to these classes shortly.

The table structure should look like this:

```
<table id="sheetTable" class="pure-table pure-table-bordered">
	<thead>
    	<tr>
        <!-- dynamically add column header titles -->
        </tr>
    </thead>
   	<tbody>
    <!-- dynamically populate table cells -->
    </tbody>
</table>
```

The column titles and cells will be dynamically populated by the JavaScript in the next step.

## Step 6: Setting up the JavaScript and displaying the table

In this step we will set up the JavaScript that will take the data collected by the Component and display it in the table. 

First, please create a new file in the root of your folder - in our example we have named it `demo.js`. You should include a link to this file within your HTML just after the closing `</rise-google-sheet>` and before the script that initializes the Component, like this:

```
<script type="text/javascript" src="demo.js"></script>
```

Please see the `demo.js` file in the [repository](https://github.com/Rise-Vision/rise-google-sheet-demo) and copy and paste the code from there. All of the code is annotated so you can see the role of each function in relation to taking the data collected by the Component and displaying it on the page.

You will also need to add two lines of code between the <script> tags in your HTML file. These should go after the `sheet.go()` command to initialize the function in the demo.js file . The two lines are:

```
// new instance of demoSheet object
var demo = new demoSheet();

 // initialize the content of the demo table
 demo.init();
 ```

Now when you refresh the page you should see the data you entered in the spreadsheet appearing in a rough table form like this:

![basic version of table](https://cloud.githubusercontent.com/assets/8008948/9567936/b62ddf0c-4f09-11e5-881d-530d130f71fa.png)

Congratulations, you used the Component to fetch the data and you used JavaScript to display that data in your HTML!

As an optional extra, remember those classes we added to the table tag in Step 5? Those refer to class found in the stylesheet from [purecss.io](http://purecss.io/). You can add this stylesheet to your demo by adding the following link within the head tags:

```
<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
```

Now when you refresh the page your table should look something like this:

![styled version of table](https://cloud.githubusercontent.com/assets/8008948/9567938/bb37f348-4f09-11e5-8a30-61148c61e2ff.png)

You can now experiment with the different attributes of the component. Try changing the data in one of the spreadsheet cells and wait for the Component to automatically refresh. Wow! The new content appears on the page without you even having to click refresh! 

You can also try specifying specific rows and columns to take the data from. Remember, displaying the data as an HTML table is just one option, and you can experiment with different displays by changing the HTML and JavaScript.

We can’t wait to see what you come up with. Remember, you can let us know what you think about the Components and show us what you have created in the Rise Vision Web Designer community [here](https://community.risevision.com/rise_vision_inc/categories/rise_vision_inc_web_designers). Good luck!