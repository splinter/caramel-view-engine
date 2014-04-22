/**
 * The plugin is used to serve the compiled view
 */
var compileOutput={};

(function(){
    var log=new Log('compiled-output-plugin');

    var check=function(){
        log.debug('Checking if compiledOutputPlugin can be used.');
        //Check the request to see if the application/html content-type header has been seen
        return true;
    };

    var PAGES_DIR='pages/';

    /**
     * The function is used to obtain the page path given the name
     * @param pageName
     */
    var getPagePath = function (pageName) {

        var pagePath = PAGES_DIR + pageName + '.hbs';
        return caramel.theme().resolve(pagePath);
    };

    /**
     * The function returns the contents of a given page
     * @param pagePath
     * @returns {string}
     */
    var getPageContent = function (pagePath) {
        var page = new File(pagePath);
        var pageContent = '';
        if(page.isExists()){
            page.open('r');
            pageContent=page.readAll();
            page.close();
        }
        return pageContent;
    };


    /**
     * The function generates the contents of a page
     * @param page
     * @param contexts
     * @param meta
     * @param Handlebars
     */
    var output=function(context){
        var page=context.page;
        var contexts=context.contexts;
        var meta=context.meta;
        var handlebars=context.handlebars;
        var pagePath=getPagePath(page);
        var pageContent=getPageContent(pagePath);
        var compiledPage=handlebars.compile(pageContent);
        print(compiledPage(contexts));
    };

    compileOutput.output=output;
    compileOutput.check=check;

}());
