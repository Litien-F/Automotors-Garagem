import Header from '@/components/organisms/Header/Header';
import Hero from '@/components/organisms/Hero/Hero';
import ProductsSection from '@/components/organisms/ProductsSection/ProductsSection';
import AboutSection from '@/components/organisms/AboutSection/AboutSection';
import Footer from '@/components/organisms/Footer/Footer';

/**
 * Página Principal - Home
 * 
 * Composição de todos os organismos da aplicação.
 * Segue princípios: Composição, Separation of Concerns
 */
export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        <Hero />
        <ProductsSection />
        <AboutSection />
      </main>
      
      <Footer />
    </>
  );
}
