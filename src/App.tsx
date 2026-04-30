import './i18n';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import ChatWidget from './components/chat/ChatWidget';

export default function App() {
  return (
    <>
      <Navbar />
      <HomePage />
      <ChatWidget />
    </>
  );
}
