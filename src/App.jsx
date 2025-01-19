import './App.css';
import BootstrapList from './bootstrapList';

// const listMode = [
//   {
//     slug: 'bootstrap',
//     title: 'Bootstrap List',
//   },
//   {
//     slug: 'normal',
//     title: 'Normal List',
//   }
// ]

function App() {

  return <BootstrapList />
}


{/* 
  const [activeMode, setActiveMode] = useState(listMode[0].slug);
  
  <div>Select List Mode</div>
      <div className='d-flex gap-2'>
        {listMode?.map(item => <Button key={item.slug} onClick={() => setActiveMode(item.slug)}>{item.title}</Button>)}
      </div>
      {activeMode === 'Bootstrap' ? <BootstrapList /> : activeMode === 'Bootstrap' ? <NormalList /> : null } */}

export default App
