// 定义 react-use 库的主要 hooks
export const SIDEBAR_MENU = [
  {
    categoryCn: "传感器",
    category: "Sensors", // 浏览器/设备传感器和事件相关的 Hook
    hooks: [
      { name: "createBreakpoint", description: "创建断点组件" },
      { name: "useKey", description: "键盘按键绑定组件" },
      { name: "useEvent", description: "为 window 或 DOM 元素添加事件监听" },
      { name: "useHover", description: "检测元素是否被鼠标悬停" },
      { name: "useIdle", description: "检测用户是否处于空闲状态" },
      {
        name: "useIntersection",
        description: "检测元素是否进入视口 (Intersection Observer)",
      },
      // { name: "useScratch", description: "检测拖拽和刮擦手势" },
      { name: "useScroll", description: "追踪元素的滚动位置" },
    ],
  },
  {
    categoryCn: "状态",
    category: "State", // 状态管理相关的 Hook
    hooks: [
      { name: "useToggle", description: "管理布尔值状态" },
      { name: "useCounter", description: "管理数字计数器状态" },
      { name: "useNumber", description: "管理数字状态，带选项" },
      { name: "useGetSet", description: "返回 [getState, setState] 数组" },
      { name: "useGetSetState", description: "用于对象状态的 getter/setter" },
      {
        name: "useSetState",
        description: "合并式更新对象状态 (类似 class component setState)",
      },
      { name: "usePrevious", description: "追踪上一次渲染时的 props 或 state" },
      { name: "useStateList", description: "在数组状态中循环切换" },
      { name: "useList", description: "管理数组状态的便捷操作" },
      { name: "useMap", description: "管理 Map 数据结构状态" },
      { name: "useSet", description: "管理 Set 数据结构状态" },
      { name: "useQueue", description: "管理队列状态" },
      { name: "useStateValidator", description: "带验证逻辑的状态管理" },
      { name: "useStateHistory", description: "带历史记录（撤销/重做）的状态" },
      { name: "useLocalStorage", description: "将状态同步到 localStorage" },
      { name: "useSessionStorage", description: "将状态同步到 sessionStorage" },
      { name: "useCookie", description: "管理 Cookie 状态" },
      {
        name: "useDefault",
        description: "当状态为 null/undefined 时提供默认值",
      },
      {
        name: "createGlobalState",
        description: "创建可在组件间共享的全局状态",
      },
      { name: "useRendersCount", description: "计算组件渲染次数" },
    ],
  },
  {
    category: "UI", // 用户界面交互和元素相关的 Hook
    hooks: [
      { name: "useClickAway", description: "检测元素外部的点击事件" },
      { name: "useContextMenu", description: "追踪右键菜单状态" },
      { name: "useCss", description: "动态修改 CSS 变量或样式" },
      { name: "useDrop", description: "处理文件或数据拖放" },
      { name: "useDropZone", description: "useDrop 的 Ref 版本" },
      { name: "useFullscreen", description: "管理元素或页面的全屏状态" },
      { name: "useHover", description: "检测元素是否被鼠标悬停 (简单版)" },
      { name: "useHoverDirty", description: "检测元素是否被鼠标悬停 (精确版)" },
      {
        name: "useKeyboardJs",
        description: "高级键盘事件绑定 (依赖 keyboardjs)",
      },
      { name: "useKeyPress", description: "检测特定按键是否被按下" },
      {
        name: "useKeyPressEvent",
        description: "监听特定按键的 keydown/keyup 事件",
      },
      { name: "useLongPress", description: "检测长按手势" },
      { name: "useMedia", description: "追踪 CSS 媒体查询的状态" },
      { name: "usePageLeave", description: "检测鼠标是否离开页面" },
      { name: "useScroll", description: "追踪元素的滚动位置" },
      { name: "useScrollbarWidth", description: "获取浏览器滚动条宽度" },
      { name: "useScrolling", description: "检测元素是否正在滚动" },
      { name: "useStartTyping", description: "检测用户何时开始输入" },
      { name: "useTitle", description: "动态设置页面标题 (document.title)" },
      { name: "useWindowScroll", description: "追踪窗口的滚动位置" },
      { name: "useWindowSize", description: "追踪窗口的尺寸" },
      { name: "useMeasure", description: "测量 DOM 节点的尺寸和位置" },
      { name: "useTextSelection", description: "获取用户选择的文本内容和位置" },
      { name: "useCopyToClipboard", description: "复制文本到剪贴板" },
    ],
  },

  {
    category: "Side Effects", // 管理异步操作、订阅等副作用的 Hook
    hooks: [
      { name: "useAsync", description: "管理异步函数调用状态 (简单版)" },
      { name: "useAsyncFn", description: "返回异步函数及其状态/结果" },
      { name: "useAsyncRetry", description: "带自动重试功能的 useAsync" },
      { name: "useBeforeUnload", description: "在用户离开页面前触发提示" },
      {
        name: "useCopyToClipboard",
        description: "复制文本到剪贴板 (也属于UI)",
      }, // 重复出现，因为它跨领域
      { name: "useDebounce", description: "对值或函数进行防抖处理" },
      {
        name: "useDeepCompareEffect",
        description: "依赖项进行深比较的 useEffect",
      },
      { name: "useEvent", description: "为 window 或 DOM 元素添加事件监听" },
      { name: "useFavicon", description: "动态设置网站 favicon" },
      {
        name: "useFetch",
        description: "执行 fetch 请求 (较旧，推荐 useAsync)",
      },
      { name: "useInterval", description: "运行定时器 (setInterval)" },
      { name: "useIsClient", description: "判断当前是否在客户端环境" },
      { name: "useLocationHash", description: "管理 URL hash" },
      { name: "useLogger", description: "在组件生命周期和渲染时打印日志" },
      { name: "usePromise", description: "追踪 Promise 状态" },
      {
        name: "useRaf",
        description: "在 requestAnimationFrame 循环中执行函数 (单次)",
      },
      { name: "useRafLoop", description: "管理 requestAnimationFrame 循环" },
      { name: "useSearchParam", description: "获取 URL 查询参数" },
      { name: "useThrottle", description: "对值进行节流处理" },
      { name: "useThrottleFn", description: "对函数进行节流处理" },
      { name: "useTimeout", description: "运行延时器 (setTimeout)" },
      { name: "useTimeoutFn", description: "返回可控的延时函数" },
      {
        name: "useTitle",
        description: "动态设置页面标题 (document.title) (也属于UI)",
      }, // 重复出现
      { name: "useUpdate", description: "提供一个函数来强制组件重新渲染" },
      { name: "useWebSocket", description: "管理 WebSocket 连接" },
    ],
  },
  {
    category: "Lifecycles", // 与组件生命周期相关的 Hook
    hooks: [
      { name: "useEffectOnce", description: "仅在组件挂载时运行一次的 Effect" },
      {
        name: "useEventCallback",
        description: "创建在渲染间保持引用稳定的事件回调",
      },
      { name: "useIsMounted", description: "追踪组件是否已挂载" },
      { name: "useLifecycles", description: "在挂载和卸载时执行回调" },
      { name: "useMount", description: "仅在组件挂载时执行回调" },
      { name: "useUnmount", description: "仅在组件卸载时执行回调" },
      {
        name: "useUpdateEffect",
        description: "仅在组件更新时执行的 Effect (跳过首次渲染)",
      },
      {
        name: "useIsomorphicLayoutEffect",
        description: "在客户端使用 useLayoutEffect，在服务端使用 useEffect",
      },
    ],
  },
  {
    category: "Animation", // 动画相关的 Hook
    hooks: [
      {
        name: "useRafState",
        description: "在 requestAnimationFrame 中更新状态",
      },
      {
        name: "useSpring",
        description: "基础的弹簧动画值 (已不推荐，可能被移除)",
      }, // 注意：react-use 的 useSpring 比较基础
      { name: "useTween", description: "创建补间动画值" },
      {
        name: "useRaf",
        description:
          "在 requestAnimationFrame 循环中执行函数 (也属于 Side Effects)",
      },
      {
        name: "useRafLoop",
        description: "管理 requestAnimationFrame 循环 (也属于 Side Effects)",
      },
    ],
  },
  // 可以根据需要添加更多分类，如 'Utilities'
];
