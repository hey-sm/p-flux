# useHooks 组件结构

本项目中的 Hook 组件采用分层结构，便于管理和维护。

## 目录结构

```
/src/app/useHooks/
  ├── [hook]/                # 动态路由
  │   └── page.tsx           # 动态加载不同的hook组件
  ├── components/            # 公共组件
  │   ├── HookDemo.tsx       # Hook演示容器
  │   ├── HookComparison.tsx # 代码对比组件
  │   └── hooks/             # 各种hook实现
  │       ├── useBoolean/    # useBoolean hook
  │       │   ├── index.tsx  # 主入口
  │       │   ├── NativeImplementation.tsx  # 原生实现
  │       │   └── Scenarios.tsx  # 使用场景
  │       ├── useCounter/    # useCounter hook
  │       │   └── ...
  │       └── ...
  └── hookTemplate/          # 创建新hook的模板
      ├── index.tsx
      ├── NativeImplementation.tsx
      ├── Scenarios.tsx
      └── README.md
```

## 文件职责分工

1. **page.tsx**: 负责动态获取和加载不同的 hook 组件
2. **index.tsx**: 负责导出完整的 hook 页面、元数据和 NativeImplementation
3. **NativeImplementation.tsx**: 负责实现 hook 的原生版本和代码对比
4. **Scenarios.tsx**: 负责实现不同的使用场景和代码示例

## 添加新的 Hook

1. 复制 `hookTemplate` 目录到 `components/hooks/` 目录下
2. 将目录重命名为对应的 Hook 名称，如 `useXxx`
3. 修改文件内容，实现具体功能
4. 在 `HOOK_MODULES` 中添加新的映射

## 数据流向

```
page.tsx ──(动态加载)──> index.tsx ──(组合)──> NativeImplementation.tsx + Scenarios.tsx
```

具体数据流向:

1. page.tsx 通过 hookId 动态加载对应的 hook 组件
2. 从 index.tsx 获取 HOOK_META、HOOK_SCENARIOS 和 NativeImplementation
3. 将这些数据传递给 HookDemo 组件进行渲染
