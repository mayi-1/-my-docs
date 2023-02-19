import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    { text: "首页", icon: "home", link: "/" },
    {
      text: "学习计划",
      icon: "study",
      link: "/plan.md",
    },
    {
      text: "学习笔记", icon: "note", prefix: "/notes/",
      collapsible: true,
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
          collapsible: true,
          children: [
            {
              text: "node基础",
              link: "node.md",
            },
            {
              text: "Express",
              link: "express.md",
            },
            {
              text: "mysql",
              link: "mysql.md",
            },
          ]
        },
      ],
    },
    // {
    //   icon: "discover",
    //   text: "Demo",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    // {
    //   text: "Articles",
    //   icon: "note",
    //   prefix: "posts/",
    //   children: "structure",
    // },
    // "intro",
    // "slides",
  ],
});
