import "./App.css"
import TaskClient from "./components/TaskClient"
import Header from "./components/Header"

function App() {
  return (
    <div className="bg-slate-100 h-screen">
      <Header />
      <TaskClient />
    </div>
  )
}

export default App
