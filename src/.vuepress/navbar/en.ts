import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  { text: "首页", icon: "home", link: "/" },
  {
    text: "学习计划",
    icon: "study",
    link: "/plan.md",
  },
  {
    text: "学习笔记",
    icon: "note",
    prefix: "/notes/",
    // activeMatch: "^/notes",
    children: [
      {
        text: "vue2",
        icon: "vue",
        link: "vue2",
      },
      {
        text: "vue3",
        icon: "vue",
        link: "vue3",
      },
      {
        text: "Node.js",
        icon: "nodeJS",
        prefix: "node/",
        activeMatch: "^/notes/node",
        link: "node/node.md",
        // children: [
        //   {
        //     text: "node.js基础",
        //     icon: "node",
        //     link: "node.md",
        //   },
        //   {
        //     text: "express",
        //     icon: "node",
        //     link: "express.md",
        //   },
        // ]
      },

    ]
  },
  // {
  //   text: "Posts",
  //   icon: "edit",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Apple",
  //       icon: "edit",
  //       prefix: "apple/",
  //       children: [
  //         { text: "Apple1", icon: "edit", link: "1" },
  //         { text: "Apple2", icon: "edit", link: "2" },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     {
  //       text: "Banana",
  //       icon: "edit",
  //       prefix: "banana/",
  //       children: [
  //         {
  //           text: "Banana 1",
  //           icon: "edit",
  //           link: "1",
  //         },
  //         {
  //           text: "Banana 2",
  //           icon: "edit",
  //           link: "2",
  //         },
  //         "3",
  //         "4",
  //       ],
  //     },
  //     { text: "Cherry", icon: "edit", link: "cherry" },
  //     { text: "Dragon Fruit", icon: "edit", link: "dragonfruit" },
  //     "tomato",
  //     "strawberry",
  //   ],
  // },
  // {
  //   text: "V2 Docs",
  //   icon: "note",
  //   link: "https://theme-hope.vuejs.vuepress/",
  // },
]);
