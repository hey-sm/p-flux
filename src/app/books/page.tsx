export default function BooksHomePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-3xl font-bold mb-6">欢迎使用电子书阅读器</h1>
        <p className="text-gray-600 mb-8">
          请从左侧选择一本书开始阅读，或上传新的EPUB电子书。
        </p>
      </div>
    </div>
  );
}
