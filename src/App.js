import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Nav from './components/Nav'


export default function App() {
  return (
    <div className='bg-stone-400'>
      <Header />
      <Nav />
      <Main />
    </div>
  );
}