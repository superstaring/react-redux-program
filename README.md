# react-redux

### 创建项目

`npx create-react-app react-router-program`

### 安装插件

在React中使用Redux，官方要求安装两个其它插件- Redux Toolkit（RTK是一套工具的集合集，简化书写方式）和react-redux。

`npm i @reduxjs/toolkit react-redux`

### 使用

- counterStore.js 同步使用
- channelStore.js 异步使用

使用Redux Toolkit 创建couterStore

1.创建counterStore.js
    import { createSlice } from "@reduxjs/toolkit";
    const counterStore = createSlice({
        name: 'counter',
        // 初始化state
        initialState: {
            count: 0,
        },
        // 修改状态的方法 同步方法 支持直接修改
        reducers: {
            increment(state) {
                state.count++;
            },
            decrement(state) {
                state.count--;
            },
            addToNum(state, action) {
                // payload固定的属性
                state.count = action.payload;
            }
        }
    })

    // 解构出来actionCreater函数
    const { increment, decrement, addToNum } = counterStore.actions;

    // 获取reducer
    const reducer = counterStore.reducer;

    export { increment, decrement, addToNum };

    export default reducer;

2.导出store

    import counterReducer from "./modules/counterStore";
    const store = configureStore({
        reducer: {
            counter: counterReducer
        }
    })
    export default store;

3.在index.js中添加：

    import { Provider } from "react-redux";
    <Provider store={store}>
      <App />
    </Provider>

4.在App.js中使用：
   
    import { decrement, increment, addToNum } from "./store/modules/counterStore";
    function App() {
        // useSelector钩子函数
        const { count } = useSelector((state) => state.counter);

        const dispatch = useDispatch();
        return (
        <div className="App">
            <button onClick={() => dispatch(decrement())}>-</button>
            {count}
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(addToNum(10))}>add To 10</button>
            <button onClick={() => dispatch(addToNum(20))}>add To 20</button>
        </div>
        );
    }
    export default App;

### 异步操作样板（如何发布异步请求）

1.创建store的写法保持不变，配置好同步修改状态的方法；

2.单独封装一个函数，在函数内部return一个新函数，在新函数中：
  2.1 封装异步请求获取数据；
  2.2 调用同步actionCreater传入异步数据生成一个action对象；

3.组件中dispatch的写法保持不变； 