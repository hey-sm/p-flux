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
      { name: "useList", description: "管理数组状态的便捷操作" },
      { name: "useObservable", description: "管理可观察对象状态" },
    ],
  },
  {
    categoryCn: "副作用",
    category: "SideEffects", // 管理异步操作、订阅等副作用的 Hook
    hooks: [
      { name: "useAsync", description: "管理异步函数调用状态 (简单版)" },
      { name: "useBeforeUnload", description: "在用户离开页面前触发提示" },
      { name: "useCookie", description: "管理 Cookie 状态" },
      {
        name: "useCopyToClipboard",
        description: "复制文本到剪贴板 (也属于UI)",
      },
      { name: "useDebounce", description: "对值或函数进行防抖处理" },
    ],
  },
  {
    category: "UI", // 用户界面交互和元素相关的 Hook
    hooks: [
      { name: "useAudio", description: "管理音频播放状态" },
      { name: "useClickAway", description: "检测元素外部的点击事件" },
      { name: "useDrop", description: "处理文件或数据拖放" },
      { name: "useFullscreen", description: "管理元素或页面的全屏状态" },
    ],
  },
];
