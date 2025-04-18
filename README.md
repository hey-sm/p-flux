# 项目通用规则

## 1. 代码结构与组织

### 目录结构

- `/src/app`: Next.js 应用路由和页面组件
- `/src/components`: 可复用 UI 组件
- `/src/lib`: 工具函数和服务
- `/src/api`: API 接口和服务
- `/public`: 静态资源

### 命名规范

- **文件命名**:
  - 页面组件: `page.tsx`
  - 布局文件: `layout.tsx`
  - 其他组件: 使用`PascalCase.tsx`
  - 工具函数: 使用`kebab-case.ts`
- **组件命名**: 使用`PascalCase`，如`QuoteDisplay`
- **函数命名**: 使用`camelCase`，如`fetchQuotes`
- **变量命名**: 使用`camelCase`，如`quoteData`
- **常量命名**: 使用`UPPER_SNAKE_CASE`，如`API_ENDPOINT`

## 2. 数据管理规则

### 数据库

- 表名使用**复数形式**（如`quotes`而非`quote`）
- 总是使用`IF NOT EXISTS`创建表，确保代码可移植性
- 所有表必须有`id`主键和`created_at`时间戳字段
- 敏感数据必须加密存储

### API 接口

- 使用 RESTful 风格设计 API
- API 路由按资源类型组织，如`/api/quotes`
- 使用标准 HTTP 方法（GET, POST, PUT, DELETE）
- 始终返回统一的响应结构:
  ```typescript
  {
    success: boolean,
    data?: any,
    error?: string,
    message?: string
  }
  ```

## 3. 前端开发规则

### 组件设计

- 遵循单一职责原则，每个组件只负责一个功能
- 使用`client`指令标记客户端组件
- 大型组件拆分为多个小组件
- 使用 TypeScript 接口定义 Props 类型

### 样式规范

- 使用 Tailwind CSS 作为主要样式方案
- 遵循移动优先设计原则
- 使用`className={cn()}`合并多个类名
- 复杂组件使用组合式类名策略:
  ```jsx
  <div className={cn(
    "base-styles",
    variant === "primary" && "primary-styles",
    className
  )}>
  ```

### 状态管理

- 小型状态使用`useState`和`useReducer`
- 跨组件状态使用 Context API
- 复杂状态考虑使用状态管理库
- 优先使用服务器状态而非客户端状态

## 4. 性能与优化

### 加载优化

- 使用骨架屏或加载指示器提高用户体验
- 对大列表使用虚拟化技术
- 图片必须添加`width`和`height`属性
- 实现数据懒加载和分页

### 性能规则

- 避免不必要的组件重新渲染
- 使用`useMemo`和`useCallback`优化性能
- 大型组件使用动态导入（`next/dynamic`）
- 针对关键渲染路径优化 CSS 加载

## 5. 错误处理

### 前端错误处理

- 所有 API 请求必须包含错误处理
- 提供用户友好的错误消息
- 实现全局错误边界捕获未处理异常
- 在开发环境中记录详细错误信息

### 后端错误处理

- 使用 try-catch 包装所有数据库操作
- 规范化错误响应格式
- 敏感错误信息不暴露给客户端
- 实现请求验证和参数检查

## 6. 安全规则

- 实现 CSRF 保护机制
- API 管理接口必须加入认证
- 避免在客户端存储敏感信息
- 实现输入数据的验证和清洁
- 定期更新依赖包以修复安全漏洞

## 7. 测试策略

- 组件单元测试使用 Jest 和 React Testing Library
- 关键业务逻辑必须有单元测试覆盖
- 实现端到端测试验证用户流程
- 每次发布前运行完整测试套件

## 8. 提交与版本控制

- 使用语义化提交信息，如`feat: 添加引言管理功能`
- 遵循 GitFlow 或类似的分支策略
- 重要功能通过 Pull Request 合并
- 定期清理过时分支

## 9. 文档规范

- 每个组件和关键函数必须有 JSDoc 注释
- 维护一个`README.md`文件说明项目概况
- 关键业务流程必须有流程图文档
- API 接口必须有详细文档

## 10. 环境与配置

- 使用`.env`文件管理环境变量
- 区分开发、测试和生产环境配置
- 敏感配置不应提交到版本控制
- 部署前验证所有环境变量

这些规则可以帮助您的项目保持一致性、可维护性和可扩展性，根据项目的具体需求可以进行调整和扩展。
