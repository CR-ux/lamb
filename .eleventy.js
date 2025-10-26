module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"assets": "assets"});
    eleventyConfig.addPassthroughCopy({"functions": "functions"}); // CF Functions
    eleventyConfig.addWatchTarget("assets/css/ritual.css");

    return {
        dir: {
        input: "content",
        includes: "../_includes",
        data: "../_data",
        output: "_site"
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
        };
    };