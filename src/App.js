import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Nav from './components/Nav'


export default function App() {
  return (
    <div className="App text-green-600 font-bold">
      <Header />
      <Nav />
      <Main />
    </div>
  );
}