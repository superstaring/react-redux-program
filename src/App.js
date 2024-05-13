import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, addToNum } from "./store/modules/counterStore";
import { fetchChannelList } from "./store/modules/channelStore";

function App() {
  // useSelector钩子函数
  const { count } = useSelector((state) => state.counter);

  const { channelList } = useSelector(state => state.channel);

  const dispatch = useDispatch();

  useEffect(() => {
    // 异步请求
    dispatch(fetchChannelList())
  }, [dispatch])

  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>add To 10</button>
      <button onClick={() => dispatch(addToNum(20))}>add To 20</button>
      <br />
      <ul>
        {channelList.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
