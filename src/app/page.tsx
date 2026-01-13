import Header from '@/frontend/components/organisms/Header/Header';
import Hero from '@/frontend/components/organisms/Hero/Hero';
import ProductsSection from '@/frontend/components/organisms/ProductsSection/ProductsSection';
import AboutSection from '@/frontend/components/organisms/AboutSection/AboutSection';
import Footer from '@/frontend/components/organisms/Footer/Footer';

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
