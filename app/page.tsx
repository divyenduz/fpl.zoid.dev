import Dashboard from './sections/Dashboard'
import { SidePanel } from './sections/SidePanel'

function App() {
  return (
    <div className="grid w-full grid-cols-4 gap-2 grid-row">
      <div className="col-span-3">
        <Dashboard></Dashboard>
      </div>
      <div className="col-span-1">
        <SidePanel></SidePanel>
      </div>
    </div>
  )
}

export default App
