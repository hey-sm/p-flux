"use client";

import React from "react";
import { useAudio } from "react-use";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react";

// 基础音频播放器场景
function BasicAudioPlayerExample() {
  // 使用一个可用的音频链接
  const [audio, state, controls, ref] = useAudio({
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3",
    autoPlay: false,
  });

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>简易音频播放器</CardTitle>
          <CardDescription>使用useAudio钩子控制音频播放</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 隐藏原始音频元素，使用自定义UI */}
          <div className="hidden">{audio}</div>

          {/* 播放进度条 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(state.time)}</span>
              <span>{formatTime(state.duration)}</span>
            </div>
            <Slider
              value={[state.time]}
              min={0}
              max={state.duration || 100}
              step={0.1}
              onValueChange={(val) => controls.seek(val[0])}
              className="w-full"
            />
          </div>

          {/* 播放控制按钮 */}
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => controls.seek(Math.max(0, state.time - 10))}
            >
              <SkipBack size={20} />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={state.paused ? controls.play : controls.pause}
            >
              {state.paused ? <Play size={20} /> : <Pause size={20} />}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                controls.seek(Math.min(state.duration, state.time + 10))
              }
            >
              <SkipForward size={20} />
            </Button>
          </div>

          {/* 音量控制 */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (state.volume > 0) {
                  controls.volume(0);
                } else {
                  controls.volume(1);
                }
              }}
            >
              {state.volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
            <Slider
              value={[state.volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(val) => controls.volume(val[0] / 100)}
              className="w-full"
            />
            <span className="text-xs w-8">
              {Math.round(state.volume * 100)}%
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm">
          <div>状态: {state.paused ? "已暂停" : "播放中"}</div>
        </CardFooter>
      </Card>
    </div>
  );
}

// 音频播放列表场景
function PlaylistExample() {
  const tracks = [
    {
      id: 1,
      title: "轻松的背景音乐",
      artist: "Pixabay",
      src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3",
    },
    {
      id: 2,
      title: "愉快的钢琴曲",
      artist: "Pixabay",
      src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bea.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = React.useState(tracks[0]);
  const [audio, state, controls, ref] = useAudio({
    src: currentTrack.src,
    autoPlay: false,
  });

  // 处理下一首
  const playNext = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };

  // 处理上一首
  const playPrev = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
  };

  // 当切换曲目时自动播放
  React.useEffect(() => {
    controls.play();
  }, [currentTrack]);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>音乐播放列表</CardTitle>
          <CardDescription>多曲目播放示例</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="hidden">{audio}</div>

          <div className="text-center">
            <h3 className="font-medium">{currentTrack.title}</h3>
            <p className="text-sm text-gray-500">{currentTrack.artist}</p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(state.time)}</span>
              <span>{formatTime(state.duration)}</span>
            </div>
            <Slider
              value={[state.time]}
              min={0}
              max={state.duration || 100}
              step={0.1}
              onValueChange={(val) => controls.seek(val[0])}
              className="w-full"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon" onClick={playPrev}>
              <SkipBack size={20} />
            </Button>

            <Button
              variant="default"
              size="icon"
              onClick={state.paused ? controls.play : controls.pause}
            >
              {state.paused ? <Play size={20} /> : <Pause size={20} />}
            </Button>

            <Button variant="outline" size="icon" onClick={playNext}>
              <SkipForward size={20} />
            </Button>
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">播放列表:</h4>
            {tracks.map((track) => (
              <div
                key={track.id}
                className={`p-2 rounded cursor-pointer flex justify-between items-center ${
                  currentTrack.id === track.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setCurrentTrack(track)}
              >
                <div>
                  <div className="font-medium">{track.title}</div>
                  <div className="text-xs text-gray-500">{track.artist}</div>
                </div>
                {currentTrack.id === track.id && !state.paused && (
                  <div className="w-4 h-4 text-primary">•</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 格式化时间工具函数
function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

const CODE_EXAMPLES = {
  BasicAudioPlayerExample: `function BasicAudioPlayerExample() {
  // 使用一个可用的音频链接
  const [audio, state, controls, ref] = useAudio({
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3",
    autoPlay: false,
  });

  return (
    <div>
      {/* 隐藏原始音频元素，使用自定义UI */}
      <div style={{ display: 'none' }}>{audio}</div>
      
      <div>
        <div>
          <span>{formatTime(state.time)}</span>
          <input 
            type="range" 
            min={0} 
            max={state.duration || 100} 
            value={state.time} 
            onChange={(e) => controls.seek(Number(e.target.value))} 
          />
          <span>{formatTime(state.duration)}</span>
        </div>
        
        <div>
          <button onClick={() => controls.seek(Math.max(0, state.time - 10))}>
            后退10秒
          </button>
          <button onClick={state.paused ? controls.play : controls.pause}>
            {state.paused ? '播放' : '暂停'}
          </button>
          <button onClick={() => controls.seek(Math.min(state.duration, state.time + 10))}>
            前进10秒
          </button>
        </div>
        
        <div>
          <button onClick={() => state.volume > 0 ? controls.volume(0) : controls.volume(1)}>
            {state.volume > 0 ? '静音' : '取消静音'}
          </button>
          <input 
            type="range" 
            min={0} 
            max={1} 
            step={0.01} 
            value={state.volume} 
            onChange={(e) => controls.volume(Number(e.target.value))} 
          />
          <span>{Math.round(state.volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

// 格式化时间工具函数
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return \`\${mins}:\${secs < 10 ? "0" : ""}\${secs}\`;
}`,

  PlaylistExample: `function PlaylistExample() {
  const tracks = [
    {
      id: 1,
      title: "轻松的背景音乐",
      artist: "Pixabay",
      src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749d484.mp3",
    },
    {
      id: 2,
      title: "愉快的钢琴曲",
      artist: "Pixabay",
      src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bea.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = React.useState(tracks[0]);
  const [audio, state, controls, ref] = useAudio({
    src: currentTrack.src,
    autoPlay: false,
  });

  // 处理下一首
  const playNext = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };

  // 处理上一首
  const playPrev = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
  };

  // 当切换曲目时自动播放
  React.useEffect(() => {
    controls.play();
  }, [currentTrack]);

  return (
    <div>
      <div style={{ display: 'none' }}>{audio}</div>
      
      <div>
        <h3>{currentTrack.title}</h3>
        <p>{currentTrack.artist}</p>
      </div>

      <div>
        <button onClick={playPrev}>上一首</button>
        <button onClick={state.paused ? controls.play : controls.pause}>
          {state.paused ? '播放' : '暂停'}
        </button>
        <button onClick={playNext}>下一首</button>
      </div>

      <div>
        <h4>播放列表:</h4>
        {tracks.map((track) => (
          <div
            key={track.id}
            style={{
              padding: '8px',
              background: currentTrack.id === track.id ? '#f0f0f0' : 'transparent',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentTrack(track)}
          >
            {track.title} - {track.artist}
            {currentTrack.id === track.id && !state.paused && ' (正在播放)'}
          </div>
        ))}
      </div>
    </div>
  );
}`,
};

// 导出示例组件
export const Examples = [
  {
    title: "基础音频播放器",
    example: <BasicAudioPlayerExample />,
    code: CODE_EXAMPLES.BasicAudioPlayerExample,
  },
  {
    title: "音频播放列表",
    example: <PlaylistExample />,
    code: CODE_EXAMPLES.PlaylistExample,
  },
];
