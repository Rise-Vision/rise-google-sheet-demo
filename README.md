# Rise Google Sheet Demo Walkthrough

The Rise Vision Google Spreadsheet Component enables web designers with the ability to retrieve data from a public Google Spreadsheet and to style the returned data in an HTML page for digital signage using only JavaScript and CSS.

The source code for this Component is available on [Github](https://github.com/Rise-Vision/rise-google-sheet).

Please note this Web Component is experimental. If you encounter issues please let us know.

## Getting Started

## Step 1: Install the Component

You should first navigate to the folder where you want to install the Component. In this example we will install it in a folder named `rise-google-sheet-demo`. You can install the component and the necessary dependencies through Bower using the following command:

```
bower install https://github.com/Rise-Vision/rise-google-calendar.git
```

After running this command you should see that a folder named `src` has been downloaded. Inside this folder is the `_bower_components` folder which contains all of the files we will need to set up our page.

## Step 2: Setting up the Google Sheet

Before we start to build our page we need a [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1Aopk_gdurtAdvxr5u4X9at7K0EkWDBqD3VkgJ6je5y4/edit#gid=0). Open this Google Spreadsheet and make a copy of it by selecting File > Make Copy. Once copied, publish the Spreadsheet by selecting **File > Publish to the web**

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

You can now add the Component to the body of your HTML. This demo shows how the Component can be used to retrieve a range of data from a Google Spreadsheet. There are various attributes that apply to the Component and you can see the full list in the documentation [here](http://rise-vision.github.io/rise-google-sheet/components/rise-google-sheet/). Attributes for the Component are defined between the `<rise-google-sheet>` tags. For this demo we just need to set two attributes, **'key'** and **'refresh'**.

The key attribute is the unique identifier for the Google Spreadsheet and is the string of characters between **/d/** and **/edit#** as shown in the image below.

![spreadsheet key](https://cloud.githubusercontent.com/assets/8008948/9606709/0c8937cc-5093-11e5-915a-eab41f7ba14e.png) 

The refresh attribute determines how often the Component will check the spreadsheet for changes. For this demo we can set it at '30' which represents 30 seconds.

The code within the `<script>` tags initializes the Component and tells it to log the content of the spreadsheet cells to the console, if the cells are populated.

You can check out the files on the demo repository at any time [here](https://github.com/Rise-Vision/rise-google-sheet-demo). The body of your HTML should look like this:


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

## Step 4: Check that the data is being returned

Once the basic HTML is in place we should check that everything is working. In order to view the page, we will need to have it running on a local server. If you are using a Mac you can set up a local server by entering the following command:

```
python -m SimpleHTTPServer
```

This will set up a local server at localhost:8000. If you have set up your index.html file in the root of your directory you can view it by going to **localhost:8000/index.html**

The page should still be blank, but don’t panic! If you open up the developer tools and select ‘console’ you should see the following output:

```
[Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]
```

You should see an object being returned for each cell that was populated in the spreadsheet. In the example sheet there was 15 cells with text in them, so the component has returned 15 objects. Awesome, it works!

If you leave the console open, you should see these objects being logged every 30 seconds, which shows the Component’s refresh attribute is working too!

For further steps, including how to present this data in an HTML table, please check out the full walkthrough in the Rise Vision Web Designer Community [here](https://community.risevision.com/rise_vision_inc/topics/rise-vision-google-spreadsheet-component-pev5xixpjucb1). 