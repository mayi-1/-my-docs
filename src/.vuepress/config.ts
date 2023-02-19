import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { getDirname, path } from "@vuepress/utils";
const __dirname = getDirname(import.meta.url);
console.log("🚀 ~ file: config.ts:5 ~ __dirname", __dirname);
export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  // locales: {
  //   "/": {
  //     lang: "en-US",
  //     title: "Blog Demo",
  //     description: "A blog demo for vuepress-theme-hope",
  //   },
  //   "/zh/": {
  //     lang: "zh-CN",
  //     title: "博客演示",
  //     description: "vuepress-theme-hope 的博客演示",
  //   },
  // },
  alias: {
    "@FatherSlot": path.resolve(__dirname, "components/vue2/instruction/FatherSlot.vue"),
  },
  theme,

  shouldPrefetch: false,
});
