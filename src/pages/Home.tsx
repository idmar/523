import Header from '../sections/Header';
import Hero from '../sections/Hero';
import History from '../sections/History';
import DataCards from '../sections/DataCards';
import Teaching from '../sections/Teaching';
import StudentWorks from '../sections/StudentWorks';
import Partners from '../sections/Partners';
import Footer from '../sections/Footer';
import BackToTop from '../components/BackToTop';

export default function Home() {
  return (
    <div className="relative bg-[#030712] min-h-[100dvh]">
      <Header />
      <main>
        <Hero />
        <History />
        <DataCards />
        <Teaching />
        <StudentWorks />
        <Partners />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
