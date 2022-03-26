const glob = require('fast-glob');
const fs = require('fs');
const { minify } = require('html-minifier-terser');

module.exports = {
  onPostBuild: async ({ inputs, constants, utils }) => {
    const files = glob.sync(constants.PUBLISH_DIR + '/**/*.html');
    console.log(`Found ${files.length} files...`);

    await Promise.all(files.map(async (file) => {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const minified = await minify(content, inputs.minify_options);
        const out = fs.writeFileSync(file, minified);
        console.log(`✅ Minified ${file}`);
      } catch(err) {
        utils.build.failPlugin(`❌ ${err}`)
      }    
    }))
  }
}
