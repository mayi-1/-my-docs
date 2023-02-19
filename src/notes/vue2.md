---
lang: zh-CN
title: Vue2
icon: vue
date: 2023-01-09
description:
category:
  - Vue2
tag:
  - Vue内置指令
sticky: 98
star: true
---

## Vue 内置指令

### v-text

用于展示元素的文本内容 不解析 html 标签 与差值表达式大致相同

[手撕 v-text 源码](/sourceCode/vue2.md)
::: vue-demo v-text 案例

```vue
<template>
  <div>
    <div v-text="msg"></div>
    <div v-text="msg2"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "你好 v-text",
      msg2: "<h1>你好 v-text</h1>",
    };
  },
};
</script>
```

:::

### v-html

作用与 v-text 相同，唯一不同点是可解析标签

[手撕 v-html 源码](/sourceCode/vue2.md)
::: vue-demo v-html 案例

```vue
<template>
  <div>
    <div v-html="msg"></div>
    <div v-html="msg2"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "你好 v-html",
      msg2: "<h1>你好 v-html</h1>",
    };
  },
};
</script>
```

:::

### v-show

用于切换元素的显示与隐藏，是基于 css 的 `display:block/none` 进行切换，不管初始值为`true/false`都会创建元素，适用于切换频率较高的场景

::: vue-demo v-show 案例

```vue
<template>
  <div>
    <div v-show="flag">显示</div>
    <div v-show="!flag">隐藏</div>
    <button @click="toggle">切换</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    toggle() {
      this.flag = !this.flag;
    },
  },
};
</script>

<style>
button {
  margin-top: 10px;
}
</style>
```

:::

### v-if

用于切换元素的显示与隐藏，是直接创建元素和销毁元素，如果初始值为 false 则不会有任何操作，开销相对较大，适用于切换频率较少的场景

::: vue-demo v-if 案例

```vue
<template>
  <div>
    <div v-if="flag">显示</div>
    <div v-if="!flag">隐藏</div>
    <button @click="toggle">切换</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    toggle() {
      this.flag = !this.flag;
    },
  },
};
</script>

<style>
button {
  margin-top: 10px;
}
</style>
```

:::

### v-for

列表循环，循环数组，展示模版，绑定的 key 尽量是唯一值，有利于 diff 算法的效率，提高渲染速度

::: vue-demo v-if 案例

```vue
<template>
  <ul>
    <li v-for="item in list" :key="item.id">{{ item.name }}</li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: "苹果" },
        { id: 1, name: "栗子" },
      ],
    };
  },
};
</script>
```

:::

### v-on

`v-on`事件绑定，缩写为`@`,跟上绑定的事件名称，再加上执行的方法或语句，例如`v-on:="say"`或`@click="say"`，还可以结合[修饰符](#modifier)一起使用

::: vue-demo v-on 案例

```vue
<template>
  <div>
    <div>跟我一起说{{ msg }}</div>
    <button v-on:click="say('say Hi')">say Hi</button>
    <button @click="say('拜拜')">拜拜</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    say(msg) {
      this.msg = msg;
    },
  },
};
</script>
<style>
button {
  display: block;
  margin-top: 10px;
}
</style>
```

:::

### v-bind

`v-bind`属性绑定，缩写`:`一般用于动态的绑定属性,支持字符串，数组和对象

::: vue-demo v-bind 案例

```vue
<template>
  <div>
    <img :src="imgSrc" alt height="100" width="100" />
    <div :class="{ red: isRed }">对象</div>
    <div :class="[{ red: isRed }]">数组</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgSrc: "https://s1.ax1x.com/2023/01/10/pSmW236.jpg",
      isRed: true,
    };
  },
};
</script>
<style>
button {
  display: block;
  margin-top: 10px;
}
.red {
  color: red;
}
</style>
```

:::

### v-model

表单双向数据绑定

::: vue-demo v-model 案例

```vue
<template><input v-model="msg" @input="changeValue" />{{ msg }}</template>
<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    changeValue() {
      console.log("🚀 ~ file: vue2.md:271 ~ changeValue ~ data", this.msg);
    },
  },
};
</script>
```

:::

### v-slot

插槽共有三种，匿名插槽，具名插槽，作用域插槽

<FatherSlot />
<script setup lang="ts">
import FatherSlot from "@FatherSlot";
</script>

```vue
<!-- father 父组件 -->
<div>
    默认插槽:
    <sonSlot> 你好！默认插槽 </sonSlot>
    具名插槽：
    <sonSlot>
      <template #title> title </template>
      <template #main>main </template>
      <template #footer>footer</template>
    </sonSlot>
    作用域插槽：
    <sonSlot>
      <template #name="{ msg }"> {{ msg }} </template>
    </sonSlot>
  </div>
<!-- son 子组件 -->
<div>
    <slot></slot>
    <slot name="title"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
    <slot name="name" msg="你好作用域插槽"></slot>
  </div>
```

### v-pre

跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

::: vue-demo v-pre 案例

```vue
<template>
  <span v-pre>{{ msg }}</span>
</template>
<script>
export default {
  data() {
    return {
      msg: "v-pre",
    };
  },
};
</script>
```

:::

### v-cloak

当差值表达式未编译完成时，会利用`display:none`进行隐藏，编译完成后显示

::: vue-demo v-cloak 案例

```vue
<template>
  <div v-cloak>{{ msg }}</div>
</template>

<script>
export default {
  name: "a-dome",
  data() {
    return {
      msg: "编译完成后显示",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
</style>
```

:::

### v-once

只渲染元素和组件一次。随后的重新渲染，渲染后的节点再次更新数据将会背视为静态内容跳过。这可以用于优化更新性能。

::: vue-demo v-pre 案例

```vue
<template>
  <div v-once>不会更改：{{ msg }}</div>
  <div>会更改：{{ msg }}</div>
  <button @click="updateMsg">修改</button>
</template>
<script>
export default {
  data() {
    return {
      msg: "v-once",
    };
  },
  methods: {
    updateMsg() {
      this.msg = "更改数据";
    },
  },
};
</script>
<style>
button {
  display: block;
  margin-top: 10px;
}
</style>
```

:::

## 自定义指令

::: tip
  自定义指令在这里不可用
:::

当 vue 的内置指令不能满足我们需求的时候，就可以自己去编写需要的自定义指令了

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

`bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

`inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

`update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新

`componentUpdated`指令所在组件的 VNode 及其子 VNode 全部更新后调用。

`unbind`：只调用一次，指令与元素解绑时调用

::: vue-demo 自定义指钩子打印顺序 案例

```vue
<template>
  <div>
    <!-- 绑定自定义指令 -->
    <button v-if="show" v-log="'你好'" @click="onBtn">{{ msg }}</button>
    <button @click="show = !show">切换</button>
  </div>
</template>

<script>
export default {
  name: "v-log",
  data() {
    return {
      msg: "按钮",
      show: true,
    };
  },
  directives: {
    // 注册指令时不需要写v- 使用的时候需要v-
    log: {
      bind(el, binding) {
        // 无法拿到父节点
        console.log("🚀 ~ file: dome.vue:16 ~ bind ~ el", el);
        console.log("🚀 ~ file: dome.vue:16 ~ bind ~ binding", binding.value);
      },
      inserted() {
        console.log("🚀 ~ file: dome.vue:26 ~ inserted ~ inserted");
      },
      update() {
        console.log("🚀 ~ file: dome.vue:24 ~ update ~ update");
      },
      componentUpdated() {
        console.log(
          "🚀 ~ file: dome.vue:29 ~ componentUpdated ~ componentUpdated"
        );
      },
      unbind() {
        console.log("🚀 ~ file: dome.vue:34 ~ unbind ~ unbind");
      },
    },
  },
  created() {},
  methods: {
    onBtn() {
      this.msg = "123";
    },
  },
};
</script>
<style>
button {
  display: block;
  margin-top: 10px;
}
</style>
```

:::



<!-- ## Vue 内置组件

### component

### transition

### transition-group

### keep-alive

### slot -->

## <a id="modifier">修饰符</a>

### .stop

`.stop` - 调用 `event.stopPropagation()` ， 阻止冒泡

::: vue-demo .stop 案例

```vue
<template>
  <!-- 打开控制台看打印 -->
  <div class="father" @click="onFather">
    <button class="son" @click.stop="onSon1">
      子组件1：点击不会触发父组件的事件
    </button>
    <button class="son" @click="onSon2">
      触发子组件2：点击会触发父组件的事件
    </button>
  </div>
</template>

<script>
export default {
  name: "my-dome",
  methods: {
    onFather() {
      console.log("🚀 ~ 触发父组件的事件");
    },
    onSon1() {
      console.log("🚀 ~ 触发子组件1的事件");
    },
    onSon2() {
      console.log("🚀 ~ 触发子组件2的事件");
    },
  },
};
</script>
<style>
button {
  display: block;
  margin-top: 10px;
}
</style>
```

:::

### .prevent

`.prevent` - 调用 `event.preventDefault()`，阻止默认事件

```vue
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
```

### .self

`.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调

```vue
<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### .native

`.native` - 监听组件根元素的原生事件

```vue
<!-- 监听组件根元素的原生事件 -->
<a v-on:click.native="doThis"></a>
```

### .once

`.once` - 只触发一次回调

```vue
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

<!-- - `.left` - (2.2.0) 只当点击鼠标左键时触发
- `.right` - (2.2.0) 只当点击鼠标右键时触发
- `.middle` - (2.2.0) 只当点击鼠标中键时触发
- `.capture` - 添加事件侦听器时使用 `capture` 模式
- `.passive` - (2.3.0) 以 { passive: true } 模式添加侦听器
- `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调 -->
