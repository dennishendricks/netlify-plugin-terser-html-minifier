const glob = require('fast-glob');
const fs = require('fs');
const { minify } = require('html-minifier-terser');

module.exports = {
  onPostBuild: async ({ inputs, constants, utils }) => {
    const files = glob.sync(constants.PUBLISH_DIR + '/**/*.html');
    const debug = inputs.debug;
    let i = 0;

    if (debug) { 
      console.log("Plugin inputs:", inputs);
      console.log(`Found ${files.length} files...`);
    };

    await Promise.all(files.map(async (file) => {
      try {
        const content = fs.readFileSync(file, 'utf-8');
        const minified = await minify(content, inputs.minify_options);
        const out = fs.writeFileSync(file, minified);

        if (debug) {
          const details = {
            "Old size in characters": content.length,
            "Old size in byte": Buffer.byteLength(content, 'utf8'),
            "New size in characters": minified.length,
            "New size in byte": Buffer.byteLength(minified, 'utf8'),
            "Difference": Buffer.byteLength(minified, 'utf8') - Buffer.byteLength(content, 'utf8') + " byte"
          };

          console.log(`✅ Minified ${file}`, details) 
        };
        i++;
      } catch(err) {
        if (debug) { console.log(`❌ Failed minimization of ${file}, error: ${err}`) };
      }
    }))

    console.log(`Minified ${i} files`)
  }
}
