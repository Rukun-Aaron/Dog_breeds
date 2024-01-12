import logo from './logo.svg';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ImageUploadNew from './components/ImageUploadNew';
function App() {
  return (
    <div className="w-full h-screen drawer drawer-end">
      <div className="h-full w-full dark:bg-neutral-900 scrollbar overflow-y-auto">
        <ImageUploadNew />
      </div>
    </div>
  );
}

export default App;
