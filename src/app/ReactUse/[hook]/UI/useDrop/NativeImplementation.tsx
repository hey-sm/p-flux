// useDrop 和 useDropArea 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现拖放功能
  hook: `import React, { useState } from 'react';
import { useDrop, useDropArea } from 'react-use';

// 使用 useDrop - 跟踪整个页面的拖放事件
function PageDropExample() {
  const [content, setContent] = useState(null);
  
  // 这里 useDrop 直接返回状态对象
  const state = useDrop({
    onFiles: (files) => {
      setContent(\`收到 \${files.length} 个文件\`);
      console.log('dropped files:', files);
    },
    onText: (text) => {
      setContent(\`收到文本: \${text}\`);
      console.log('dropped text:', text);
    },
    onUri: (uri) => {
      setContent(\`收到链接: \${uri}\`);
      console.log('dropped uri:', uri);
    },
  });
  
  return (
    <div>
      <h3>整个页面都可以接收拖放内容</h3>
      <p>状态: {state.over ? '有内容正在拖放...' : '拖动一些内容到页面任意位置'}</p>
      {content && <div>{content}</div>}
    </div>
  );
}

// 使用 useDropArea - 跟踪特定元素的拖放事件
function AreaDropExample() {
  const [files, setFiles] = useState([]);
  
  // useDropArea 返回 [bond, state]
  // bond 用于绑定到目标DOM元素
  const [bond, state] = useDropArea({
    onFiles: (files) => {
      setFiles(Array.from(files));
    },
    onText: (text) => console.log('文本已拖放:', text),
    onUri: (uri) => console.log('链接已拖放:', uri),
  });
  
  return (
    <div>
      <h3>拖放区示例</h3>
      <div 
        {...bond}
        style={{
          padding: '2rem',
          border: '2px dashed #ccc',
          borderRadius: '4px',
          backgroundColor: state.over ? '#f0f8ff' : 'white',
          transition: 'background-color 0.2s',
          textAlign: 'center'
        }}
      >
        {state.over ? '松开鼠标放置文件' : '拖拽文件到此处'}
      </div>
      
      {files.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4>已上传文件:</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}`,

  // 自定义 useDropArea 钩子的实现
  customHook: `import { useEffect, useRef, useState } from 'react';

// 自定义的 useDropArea 钩子
export const useCustomDropArea = (options = {}) => {
  const {
    onFiles = () => {},
    onText = () => {},
    onUri = () => {},
  } = options;
  
  const [state, setState] = useState({
    over: false,
    files: null,
    text: null,
    uri: null,
  });
  
  // 使用 ref 引用拖放区域元素
  const dropRef = useRef(null);
  
  useEffect(() => {
    if (!dropRef.current) return;
    
    const element = dropRef.current;
    
    // 拖拽进入时
    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, over: true }));
    };
    
    // 拖拽悬停时
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, over: true }));
    };
    
    // 拖拽离开时
    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setState((prev) => ({ ...prev, over: false }));
    };
    
    // 放置时
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      setState((prev) => ({ ...prev, over: false }));
      
      // 处理拖放的文件
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        const files = e.dataTransfer.files;
        setState((prev) => ({ ...prev, files }));
        onFiles(files);
        return;
      }
      
      // 处理拖放的文本
      if (e.dataTransfer.items && e.dataTransfer.items.length) {
        e.dataTransfer.items[0].getAsString((text) => {
          setState((prev) => ({ ...prev, text }));
          onText(text);
        });
      }
      
      // 处理拖放的 URI
      const uri = e.dataTransfer.getData('text/uri-list');
      if (uri) {
        setState((prev) => ({ ...prev, uri }));
        onUri(uri);
      }
    };
    
    // 添加事件监听器
    element.addEventListener('dragenter', handleDragEnter);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', handleDrop);
    
    // 清理函数
    return () => {
      element.removeEventListener('dragenter', handleDragEnter);
      element.removeEventListener('dragover', handleDragOver);
      element.removeEventListener('dragleave', handleDragLeave);
      element.removeEventListener('drop', handleDrop);
    };
  }, [onFiles, onText, onUri]);
  
  // 返回拖放区域的属性和状态
  return [
    { ref: dropRef },
    state,
  ];
};

// 自定义的 useDrop 钩子
export const useCustomDrop = (options = {}) => {
  const {
    onFiles = () => {},
    onText = () => {},
    onUri = () => {},
  } = options;
  
  const [state, setState] = useState({
    over: false,
  });
  
  useEffect(() => {
    // 拖拽进入页面时
    const handleDragEnter = (e) => {
      e.preventDefault();
      setState({ over: true });
    };
    
    // 拖拽悬停在页面上时
    const handleDragOver = (e) => {
      e.preventDefault();
      setState({ over: true });
    };
    
    // 拖拽离开页面时
    const handleDragLeave = (e) => {
      e.preventDefault();
      // 只处理离开页面的事件
      if (!e.relatedTarget || e.relatedTarget === document.body) {
        setState({ over: false });
      }
    };
    
    // 在页面上放置时
    const handleDrop = (e) => {
      e.preventDefault();
      setState({ over: false });
      
      // 处理拖放的文件
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        onFiles(e.dataTransfer.files);
      }
      
      // 处理拖放的文本
      if (e.dataTransfer.items && e.dataTransfer.items.length) {
        e.dataTransfer.items[0].getAsString((text) => {
          onText(text);
        });
      }
      
      // 处理拖放的 URI
      const uri = e.dataTransfer.getData('text/uri-list');
      if (uri) {
        onUri(uri);
      }
    };
    
    // 添加全局事件监听器
    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);
    
    // 清理函数
    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, [onFiles, onText, onUri]);
  
  // 返回状态对象
  return state;
};`,
};
