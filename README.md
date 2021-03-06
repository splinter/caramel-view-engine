caramel-view-engine
===================

A generic view based engine for Caramel.

It is heavily inspired by the Caramel Handlebars engine, and burrows many of the concepts introduced by that engine. As a result, anyone familiar with that engine will feel right at home using this module. 

Contents
========
1. Introduction
2. Usage
3. How does the engine work?
4. Building a theme
5. Plug-ins
6. Writing your own Plug-in

Introduction
============
Why do we need another Caramel engine? This is not a replacement for the existing Caramel Handlebars engine, but rather an engine built to cater routes.

Installation
============
Drop the caramel-view-engine folder in the modules folder of your Jaggery server.

Setting up the engine involves modifying the theme.js file to use the caramel-view-engine.

**theme.js:**
```javascript
  var caramelViewEngine=require('caramel-view-engine').engine;
  var engine=caramelViewEngine;
```

At this point , you can customize the rendering process by adding plugins. We will be discussing more about plug-ins in a section further down the line, but for now keep in my mind that you have the freedom to attach plug-ins at this point.

IMPORTANT: If you do not specify any plugins the engine will install two default plug-ins in order to cater requests.

Usage
=====

**myFirstRoute.js:**
```javascript
  var user={
    name:'Sam',
    age:99
  };
  
  user.__viewId='myFirstView';
  
  caramel.render(data);
```

The caramel-view-engine also supports a type of rendering called viewless model.If a data object is provided to the engine without a viewId property it will be processed in viewless mode.The engine should ONLY be operated strictly in either viewless mode or view mode.

####Viewless
The viewless mode was added to the engine to support rendering of fiber component chains[https://github.com/splinter/jaggery-fiber].

The following plugins should be used when running the engine in viewless mode;

1. component-partial-compiler
2. component-page-compiler

The plugins expect the pages and partials to be provided as file references.

How does the engine  work?
=========================

1. A controller or route will call caramel.render( [ some data , viewId] ) in order to handle a request
2. The caramel core will look for a theme.js file in the active theme and use the registered engine
3. At this point the caramel core will give control over to the caramel view engine

(Note: The next steps assume that caching has been disabled)

4. The caramel view engine will inspect the partials directory and register them with an internal reference to the Handlebars engine
5. It will then inspect the handlebars helpers directory to and load any defined helpers (Refer to sample)
6. After this initializing logic is completed the actual data object will be checked to see if the user has provided a viewId
7. If a viewId is not provided or a view cannot be found , the data will be rendered as a json object
8. However, if a viewId is provided then the render method defined in the view file is invoked with a reference to the data and a theme function
9. When and if the user calls the theme method, he or she is expected to pass in the page used to render the response
10. The theme method will internally invoke an registed plug-ins. The actual rendering operation is deferred to a plug-in as is the case with the compiled-output-plugin

Building a theme
================
The caramel-view engine expects a theme to have a few key folders;

1. pages
2. partials
3. helpers
4. handlebars-helpers 
5. public
6. plug-ins
7. views

###Pages
All pages in which partials are rendered need to be dropped into this folder.

###Partials
The partials folder should be used to store Handlebars template files defining a particular area of a view. 

**Note**You are encouraged to organize the partials into a meaningfull order such as the grouping in the sample application. The engine will crawl all sub folders in the directory.


###Helpers
The Helpers directory allows a convenient point to define all js and css files required by a particular partial file.A helper file is means by which all resources required by a partial can be defined by the user. 

**WARNING** At the time of this writing, the engine will NOT crawl all folders in the directory, so please make sure that the name you have given the helper matches that of the partial.

###Handlebars Helpers
The engine allows theme developers to specify their own Handlebars helper methods.In order to define a helper organize your code as follows in your script file:

```javascript

  var helpers=(function(){
    
      //Your helper logic 
      var myHelper=function(){
      };
      
      
      return {
        myHelper:myHelper
      }
      
  }());
  
```
The engine will load any file in the handlebars-helper directory and then automatically register any exposed methods in the helper object.The above helper can be invoked by calling {{myHelper }}.


**Note**: You are encouraged to organize the partials into a meaningfull order such as the grouping the sample application. The engine will crawl all sub folders in the directory.

###Plug-ins
You should drop any plug-ins that you use with the theme in this directory.

###Public 
The Public folder should be used to store any resources consumed by the clients.This includes all client side js and css files. 


Plug-ins
========
Plug-ins allows the rendering of views to be extended using custom logic.In fact, if you look at the sample app , you will notice that the rendering of pages is handled by a plug-in.

Writing your own Plug-in
========================
A plug-in can be created by exposing a set of predefined methods ( check, output and process).When handling a request, an engine will go through two stages; processing and output.The processing stage is used to handle tasks such as gathering all javascript files in a view, while the output stage is responsible for serving some html content to the user.

As an example we will define a simple plug-in which is invoked during the processing stage;

myLogger.js:

```javascript
var myLogger={};

var module=(function(){

   myLogger.output=function(page, contexts, meta, Handlebars){
        
   };
   
}());
```
