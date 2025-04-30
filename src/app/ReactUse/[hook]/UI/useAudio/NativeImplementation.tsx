// useAudio 钩子的原生实现示例
export const CODE_EXAMPLES = {
  // 使用 hooks 实现音频播放器
  hook: `import React from 'react';
import { useAudio } from 'react-use';

function AudioPlayer() {
  const [audio, state, controls, ref] = useAudio({
    src: 'https://example.com/audio.mp3',
    autoPlay: false,
  });
  
  return (
    <div>
      {audio}
      <div>
        <button onClick={controls.play}>播放</button>
        <button onClick={controls.pause}>暂停</button>
        <button onClick={() => controls.volume(0.5)}>音量 50%</button>
        <button onClick={() => controls.seek(state.time - 5)}>后退 5秒</button>
        <button onClick={() => controls.seek(state.time + 5)}>前进 5秒</button>
      </div>
      <div>
        当前时间: {state.time}
        总时长: {state.duration}
        暂停状态: {state.paused ? '是' : '否'}
        音量: {state.volume}
      </div>
    </div>
  );
}`,

  // 自定义 useAudio 钩子的实现
  customHook: `import { useState, useEffect, useRef } from 'react';

// 自定义 useAudio 钩子
export const useCustomAudio = (props) => {
  // 创建 audio 元素引用
  const audioRef = useRef(null);
  
  // 音频状态
  const [state, setState] = useState({
    playing: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    muted: false,
  });

  // 初始化 audio 元素
  useEffect(() => {
    const audio = new Audio();
    
    // 应用传入的属性
    if (props && props.src) {
      audio.src = props.src;
    }
    
    if (props && props.autoPlay) {
      audio.autoplay = true;
    }
    
    // 存储引用
    audioRef.current = audio;
    
    // 添加事件监听器
    const handlePlay = () => setState(s => ({ ...s, playing: true }));
    const handlePause = () => setState(s => ({ ...s, playing: false }));
    const handleTimeUpdate = () => setState(s => ({ 
      ...s, 
      currentTime: audio.currentTime 
    }));
    const handleDurationChange = () => setState(s => ({ 
      ...s, 
      duration: audio.duration 
    }));
    const handleVolumeChange = () => setState(s => ({ 
      ...s, 
      volume: audio.volume,
      muted: audio.muted 
    }));
    
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('volumechange', handleVolumeChange);
    
    // 清理函数
    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [props]);

  // 控制函数
  const controls = {
    play: () => audioRef.current?.play(),
    pause: () => audioRef.current?.pause(),
    seek: (time) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    },
    volume: (vol) => {
      if (audioRef.current) {
        audioRef.current.volume = vol;
      }
    },
    mute: () => {
      if (audioRef.current) {
        audioRef.current.muted = true;
      }
    },
    unmute: () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    },
  };

  // 返回所需的组件、状态和控制函数
  return [
    <audio 
      src={props?.src} 
      autoPlay={props?.autoPlay}
      controls={props?.controls}
    />,
    state,
    controls,
    audioRef,
  ];
};`,
};
