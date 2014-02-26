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

```javascript
  var caramelViewEngine=require('caramel-view-engine').engine;
  var engine=caramelViewEngine;
```

The above snippet of code will get you started with the engine to render html. 

theme.js:
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



Building a theme
================
A theme built for the caramel view engine should have a specific structure:

1. pages
2. partials
3. helpers
4. handlebars-helpers 
5. plug-ins


Parts of the engine
===================

Plug-ins
========
Plug-ins allows the rendering of view to be extended using custom logic.In fact, if you look at the sample app , you will notice that the rendering of the page is handled by a plug-in.

Writing your own Plug-in
========================


