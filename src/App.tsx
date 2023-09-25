import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import TodoPage from "./components/todoPage/todoPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
