import Header from './components/Header';
import Hero from './components/Hero';
import TopPicks from './components/TopPicks';
import WalletList from './components/WalletList';
import ComparisonTable from './components/ComparisonTable';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TopPicks />
      <ComparisonTable />
      <WalletList />
      <Footer />
    </>
  );
}
