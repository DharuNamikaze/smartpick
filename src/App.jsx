import Header from "./components/Header";
import Chatbot from "./components/Chatbot";
import '../src/styles/index.css'
function App() {
  return (
    <div className="App">
      <Header/>
    <main className="Chat">
      <Chatbot />
    </main>
    </div>
  )
}
export default App;