import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Nav from './components/Nav'


export default function App() {
  return (
    <div className='bg-gradient-to-b from-orange-500 to-red-500'>
      <Header />
      <Nav />
      <Main />
    </div>
  );
}