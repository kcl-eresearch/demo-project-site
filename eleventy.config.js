/**
 * Eleventy configuration for the Electron Microscopy Surface Defect
 * Research Website.
 *
 * Uses the callback function shape for full Configuration API access
 * (passthrough copy, plugins, filters) plus the named export for
 * static directory and template engine settings.
 *
 * @param {import("@11ty/eleventy").UserConfig} eleventyConfig
 */
export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
}

export const config = {
  dir: {
    input: "src",
    includes: "_includes",
    data: "_data",
    output: "_site",
  },
  markdownTemplateEngine: "liquid",
  htmlTemplateEngine: "liquid",
  templateFormats: ["md"],
  pathPrefix: "/",
};
