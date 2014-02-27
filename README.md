caramel-view-engine
===================

A generic view based engine for Caramel.

It is heavily inspired by the Caramel Handlebars engine, and burrows many of the concepts introduced by that engine. As a result, someon familiar with that engine will feel right at home using this module. 

Contents
========
1. Introduction
2. Building a theme
2. Parts of the engine
3. How is a page rendered?
4. Partials
5. Helpers
6. Handlebars Helpers
7. Plug-ins
8. Writing your own Plug-in

Introduction
============
Why do we need another Caramel engine? This is not a replacement for the existing Caramel Handlebars engine, but rather an engine built to cater routes.

Installation
============
Setting up the engine involves modifying the theme.js file to use the caramel-view-engine.

**theme.js:**
```javascript
  var caramelViewEngine=require('caramel-view-engine').engine;
  var engine=caramelViewEngine;
```

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


 

Caching
=======

How does the engine  work?
================

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
All pages in which partials are rendered need to be dropped into this folder

###Partials
The partials folder should be used to store Handlebars template files defining a particular area of a view. 

**Note**You are encouraged to organize the partials into a meaningfull order such as the grouping the sample application. The engine will crawl all sub folders in the directory.


###Helpers
The Helpers directory allows a convenient point to define all js and css files required by a particular partial file.

**Warning**: 

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


