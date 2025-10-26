module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"assets": "assets"});
    eleventyConfig.addWatchTarget("assets");
  
    return {
      dir: {
        input: "content",
        includes: "../_includes",
        data: "_data",
        output: "_site"
      },
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      templateFormats: ["md", "njk", "html"]
    };
  };