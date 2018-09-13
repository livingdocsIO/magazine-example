const { FuseBox, WebIndexPlugin, CopyPlugin } = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "./",
  target: "browser@es6",
  output: "dist/$name.js",
  useTypescriptCompiler : false,
  plugins: [
    CopyPlugin({
      files: ["design/source/assets/*"],
      dest: "files",
    }),
    WebIndexPlugin()
  ]
});
// fuse.dev(); // launch http server
fuse
  .bundle("app")
  .instructions(" > app/index.js")
  .hmr()
// .watch();
fuse.run();
