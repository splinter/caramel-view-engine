caramel-view-engine
===================

A generic view based engine for Caramel

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


