---
lang: zh-CN
title: Vue3
icon: vue
date: 2023-02-03
description:
category:
  - Vue3
tag:
  - vue3
sticky: 98
star: true
---

### 创建 vue3 项目

```npm
npm init vite-app 项目名称
```

```yarn
yarn create vite-app 项目名称
```

```npm
npm install
```

```npm
npm run dev
```

### 选项 API 和组合 API

选项式 API，可以用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。

组合式 API，可以使用导入的 API 函数来描述组件逻辑，是一系列 API 的集合，可以使用函数的方式书写 Vue 组件。
组合式 API 的风格是基于函数的组合，但组合式 API 并不是函数式编程。组合式 API 是以 Vue 中数据可变的、细粒度的响应性系统为基础的，而函数式编程通常强调数据不可变。

- 在逻辑组织和逻辑复用方面，Composition API 是优于 Options API
- Composition API 中见不到 this 的使用，减少了 this 指向不明的情况
- 可生成更小的生产包体积

### setup

- setup 是一个新的组件选项，作为组件中使用组合 API 的起点。
- 从组件生命周期来看，它的执行在组件实例创建之前 vue2.x 的 beforeCreate 执行。
- 这就意味着在 setup 函数中 this 还不是组件实例，this 此时是 undefined
- 在模版中需要使用的数据和函数，需要在 setup 返回。

::: playground#vue setup 案例
@file App.vue

```vue
<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  setup() {
    const msg = "hello Vue3";
    return { msg };
  },
};
</script>
```

:::

### 生命周期

vue2.x 生命周期钩子函数

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

vue3.0 生命周期钩子函数

- setup 创建实例前
- onBeforeMount 挂载 DOM 前
- onMounted 挂载 DOM 后
- onBeforeUpdate 更新组件前
- onUpdated 更新组件后
- onBeforeUnmount 卸载销毁前
- onUnmounted 卸载销毁后

### reactive 函数

> 注意点：
> reactive 是一个函数，它可以定义一个复杂数据类型，成为响应式数据。

**没添加响应式的数据当改变了数据，视图不会对应的更新**
::: playground#vue 不使用 reactive 案例

@file App.vue

```vue
<template>
  <div>
    <div>{{ person.name }}{{ person.age }}</div>
    <button @click="updatePerson">迪迦变身（没有添加响应式，无法变身）</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  setup() {
    const person = {
      name: "大古",
      age: 24,
    };

    const updatePerson = () => {
      person.name = "迪迦";
      person.age = 120;
      console.log("🚀 ~ setup ~ person:", person);
    };
    return { person, updatePerson };
  },
};
</script>
```

:::

::: playground#vue 使用 reactive 案例

@file App.vue

```vue
<template>
  <div>
    <div>{{ person.name }}{{ person.age }}</div>
    <div>解构后脱离响应式：{{ name }}{{ age }}</div>
    <button @click="updatePerson">迪迦变身</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "HelloWorld",
  setup() {
    const person = reactive({
      name: "大古",
      age: 24,
    });
    const updatePerson = () => {
      person.name = "迪迦";
      person.age = 120;
    };
    return { person, ...person, updatePerson };
  },
};
</script>
```

:::

### toRef 函数

toRef 是函数，转换响应式对象中某个属性为单独响应式数据，并且值是关联的。
::: playground#vue 使用 toRef 案例

@file App.vue

```vue
<template>
  <div>
    <div>{{ name }}</div>
    <button @click="updateName">迪迦变身</button>
  </div>
</template>
<script>
import { reactive, toRef } from "vue";
export default {
  name: "HelloWorld",
  setup() {
    // 1. 响应式数据对象
    const obj = reactive({
      name: "大古",
      age: 10,
    });
    console.log(obj);
    // 2. 模板中只需要使用name数据
    // 注意：从响应式数据对象中解构出的属性数据，不再是响应式数据
    // let { name } = obj 不能直接解构，出来的是一个普通数据
    const name = toRef(obj, "name");
    // console.log(name)
    const updateName = () => {
      console.log("updateName");
      // toRef转换响应式数据包装成对象，value存放值的位置
      name.value = "迪迦";
    };

    return { name, updateName };
  },
};
</script>
```

:::

### toRefs 函数

toRefs 是函数，转换响应式对象中所有属性为单独响应式数据，对象成为普通对象，并且值是关联的，可以解决 reactive 的缺陷

::: playground#vue 使用 toRefs 案例

@file App.vue

```vue
<template>
  <div>
    <div>{{ name }}</div>
    <div>{{ age }}</div>
    <button @click="updateName">迪迦变身</button>
  </div>
</template>
<script>
import { reactive, toRef, toRefs } from "vue";
export default {
  name: "HelloWorld",
  setup() {
    // 1. 响应式数据对象
    const obj = reactive({
      name: "大古",
      age: 24,
    });
    console.log(obj);
    // 2. 解构或者展开响应式数据对象
    // const {name,age} = obj
    // console.log(name,age)
    // const obj2 = {...obj}
    // console.log(obj2)
    // 以上方式导致数据就不是响应式数据了
    const obj3 = toRefs(obj);
    console.log(obj3);

    const updateName = () => {
      // obj3.name.value = 'zs'
      obj.name = "迪迦";
    };

    return { ...obj3, updateName };
  },
};
</script>
```

:::

### ref 函数

> 在修改值，获取值的时候，需要.value, 在模板中使用 ref 申明的响应式数据，可以省略.value

ref 函数，常用于简单数据类型定义为响应式数据
::: playground#vue 使用 ref 案例

@file App.vue

```vue
<template>
  <div>
    <div>{{ count }}</div>
    <button @click="addCount">+1</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "HelloWorld",
  setup() {
    const count = ref(0);
    const addCount = () => {
      count.value++;
    };
    return { count, addCount };
  },
};
</script>
```

:::

### computed 函数

computed 函数，是用来定义计算属性的，计算属性不能修改。需要修改的话要在 set 方法里修改
::: playground#vue 使用 computed 案例

@file App.vue

```vue
<template>
  <div class="container">
    <div>今年：{{ age }}岁</div>
    <div>后年：{{ newAge }}岁</div>
    <!-- 使用v-model绑定计算属性 -->
    <input type="text" v-model="newAge" />
  </div>
</template>
<script>
import { computed, ref } from "vue";
export default {
  name: "App",
  setup() {
    // 1. 计算属性：当你需要依赖现有的响应式数据，根据一定逻辑得到一个新的数据。
    const age = ref(16);
    // 得到后年的年龄
    // const newAge = computed(()=>{
    //   // 该函数的返回值就是计算属性的值
    //   return age.value + 2
    // })

    // 计算属性高级用法，传人对象
    const newAge = computed({
      // get函数，获取计算属性的值
      get() {
        return age.value + 2;
      },
      // set函数，当你给计算属性设置值的时候触发
      set(value) {
        age.value = value - 2;
      },
    });

    return { age, newAge };
  },
};
</script>
```

:::

### watch 函数

watch 函数，是用来定义侦听器的

::: playground#vue 使用 watch 案例

@file App.vue

```vue
<template>
  <div class="container">
    <div>
      <p>count的值：{{ count }}</p>
      <button @click="add">改数据</button>
    </div>
    <hr />
    <div>
      <p>{{ obj.name }}</p>
      <p>{{ obj.age }}</p>
      <p>{{ obj.brand.name }}</p>
      <button @click="updateName">改名字</button>
      <button @click="updateBrandName">改品牌名字</button>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
export default {
  name: "App",
  setup() {
    const count = ref(0);
    const add = () => {
      count.value++;
    };
    // 当你需要监听数据的变化就可以使用watch
    // 1. 监听一个ref数据
    // 1.1 第一个参数  需要监听的目标
    // 1.2 第二个参数  改变后触发的函数
    // watch(count, (newVal,oldVal)=>{
    //   console.log(newVal,oldVal)
    // })

    const obj = reactive({
      name: "ls",
      age: 10,
      brand: {
        id: 1,
        name: "宝马",
      },
    });
    const updateName = () => {
      obj.name = "zs";
    };
    const updateBrandName = () => {
      obj.brand.name = "奔驰";
    };
    // 2. 监听一个reactive数据
    watch(obj, () => {
      console.log("数据改变了");
    });

    watch(
      () => obj.brand,
      () => {
        console.log("brand数据改变了");
      },
      {
        // 5. 需要深度监听
        deep: true,
        // 6. 想默认触发
        immediate: true,
      }
    );

    // 3. 监听多个数据的变化
    // watch([count, obj], ()=>{
    //   console.log('监听多个数据改变了')
    // })

    // 4. 此时监听对象中某一个属性的变化 例如：obj.name
    // 需要写成函数返回该属性的方式才能监听到
    // watch(()=>obj.name,()=>{
    //   console.log('监听obj.name改变了')
    // })

    return { count, add, obj, updateName, updateBrandName };
  },
};
</script>
```

:::

### ref 属性

获取 DOM 或者组件实例可以使用 ref 属性，写法和 vue2.0 需要区分开
::: playground#vue 使用 ref 案例

@file App.vue

```vue
<template>
  <div class="container">
    <!-- vue2.0 获取单个元素 -->
    <!-- 1. 通过ref属性绑定该元素 -->
    <!-- 2. 通过this.$refs.box获取元素 -->
    <!-- <div ref="box">我是box</div> -->
    <!-- vue2.0 获取v-for遍历的多个元素 -->
    <!-- 1. 通过ref属性绑定被遍历元素 -->
    <!-- 2. 通过this.$refs.li 获取所有遍历元素  -->
    <!-- <ul>
      <li v-for="i in 4" :key="i" ref="li">{{i}}</li>
    </ul> -->

    <!-- 单个元素 -->
    <div ref="dom">我是box</div>
    <!-- 被遍历的元素 -->
    <ul>
      <li v-for="i in 4" :key="i" :ref="setDom">第{{ i }}LI</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
  name: "App",
  setup() {
    // 1. 获取单个元素
    // 1.1 先定义一个空的响应式数据ref定义的
    // 1.2 setup中返回该数据，你想获取那个dom元素，在该元素上使用ref属性绑定该数据即可。
    const dom = ref(null);
    // 2. 获取v-for遍历的元素
    // 2.1 定义一个空数组，接收所有的LI
    // 2.2 定义一个函数，往空数组push DOM
    const domList = [];
    const setDom = (el) => {
      domList.push(el);
    };
    onMounted(() => {
      console.log(domList);
      console.log(dom.value);
    });
    return { dom, setDom };
  },
};
</script>
```

:::

### 父子通讯

> 1.父传子：在 setup 种使用 props 数据 setup(props){ // props 就是父组件数据 }  
> 2.子传父：触发自定义事件的时候 emit 来自 setup(props,{emit}){ // emit 就是触发事件函数 }  
> 3.在 vue3.0 中 v-model 和 .sync 已经合并成 v-model 指令

::: playground#vue 使用 父子通讯 案例

@file App.vue

```vue
<template>
  <div>
    <div>父组件：{{ money }}</div>
    <button @click="subPocketMoney">父亲减少零花钱</button>
    <Son :money="money" @addPocketMoney="addPocketMoney" />
  </div>
</template>

<script>
import { ref } from "vue";
import Son from "./Son.vue";
export default {
  name: "Father",
  components: {
    Son,
  },
  setup() {
    const money = ref(100);
    const subPocketMoney = () => {
      money.value--;
    };
    const addPocketMoney = (value) => {
      money.value = value;
    };
    return { money, subPocketMoney, addPocketMoney };
  },
};
</script>
```

@file Son.vue

```vue
<template>
  <div>
    <div>子组件：{{ money }}</div>
    <button @click="addPocketMoney">儿子要零花钱</button>
  </div>
</template>

<script>
export default {
  name: "Son",
  props: {
    money: {
      type: Number,
      default: 0,
    },
  },
  // props 父组件数据
  // emit 触发自定义事件的函数
  setup(props, { emit }) {
    console.log("🚀 ~ file ~ setup ~ props:", props.money);
    const addPocketMoney = () => {
      emit("addPocketMoney", props.money + 1);
    };
    return { addPocketMoney };
  },
};
</script>
```

:::

### 依赖注入

父组件共享数据给子孙组件

::: playground#vue 使用 依赖注入 案例

@file App.vue

```vue
<template>
  <div class="container">
    <h1>父组件 {{ money }} <button @click="money = 1000">发钱</button></h1>
    <hr />
    <Son />
  </div>
</template>
<script>
import { provide, ref } from "vue";
import Son from "./Son.vue";
export default {
  name: "App",
  components: {
    Son,
  },
  setup() {
    const money = ref(100);
    const changeMoney = (saleMoney) => {
      console.log("changeMoney", saleMoney);
      money.value = money.value - saleMoney;
    };
    // 将数据提供给后代组件 provide
    provide("money", money);
    // 将函数提供给后代组件 provide
    provide("changeMoney", changeMoney);

    return { money };
  },
};
</script>
```

@file Son.vue

```vue
<template>
  <div class="container">
    <h2>子组件 {{ money }}</h2>
    <hr />
    <GrandSon />
  </div>
</template>
<script>
import { inject } from "vue";
import GrandSon from "./GrandSon.vue";
export default {
  name: "Son",
  components: {
    GrandSon,
  },
  setup() {
    // 接收祖先组件提供的数据
    const money = inject("money");
    return { money };
  },
};
</script>
```

@file GrandSon.vue

```vue
<template>
  <div class="container">
    <h3>孙组件 {{ money }} <button @click="fn">消费20</button></h3>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "GrandSon",
  setup() {
    const money = inject("money");
    // 孙组件，消费50，通知父组件App.vue组件，进行修改
    // 不能自己修改数据，遵循单选数据流原则，大白话：数据谁定义谁修改
    const changeMoney = inject("changeMoney");
    const fn = () => {
      changeMoney(20);
    };
    return { money, fn };
  },
};
</script>
```

:::

### v-model 语法糖

在 vue2.0 中 v-mode 语法糖简写的代码 

`<Son :value="msg" @input="msg=$event" />`

在 vue3.0 中 v-model 语法糖有所调整：

`<Son :modelValue="msg" @update:modelValue="msg=$event" />`

::: playground#vue 使用 v-model 语法糖改变父组件数据 案例

@file App.vue

```vue
<template>
  <div class="container">
    <!-- 如果你想获取原生事件事件对象 -->
    <!-- 如果绑定事函数 fn fn(e){ // e 就是事件对象 } -->
    <!-- 如果绑定的是js表达式  此时提供一个默认的变量 $event -->
    <h1 @click="$event.target.style.color = 'red'">父组件 {{ count }}</h1>
    <hr />
    <!-- 如果你想获取自定义事件  -->
    <!-- 如果绑定事函数 fn fn(data){ // data 触发自定义事件的传参 } -->
    <!-- 如果绑定的是js表达式  此时 $event代表触发自定义事件的传参 -->
    <!-- <Son :modelValue="count" @update:modelValue="count=$event" /> -->
    <Son v-model="count" />
  </div>
</template>
<script>
import { ref } from "vue";
import Son from "./Son.vue";
export default {
  name: "App",
  components: {
    Son,
  },
  setup() {
    const count = ref(10);
    return { count };
  },
};
</script>
```

@file Son.vue

```vue
<template>
  <div class="container">
    <h2>子组件 {{ modelValue }} <button @click="fn">改变数据</button></h2>
  </div>
</template>
<script>
export default {
  name: "Son",
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const fn = () => {
      // 改变数据
      emit("update:modelValue", 100);
    };
    return { fn };
  },
};
</script>
```

:::

### mixins 语法
