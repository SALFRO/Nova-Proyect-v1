import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Catalog from '@/sections/Catalog';
import Service from '@/sections/Service';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import CartDrawer from '@/sections/CartDrawer';
import AuthModal from '@/sections/AuthModal';
import AdminPanel from '@/sections/AdminPanel';
import { Toaster } from '@/components/ui/sonner';
import type { Watch } from '@/types';

// Productos iniciales
const initialWatches: Watch[] = [
  {
    id: 1,
    name: 'CURREN Chronograph Silver',
    brand: 'CURREN',
    price: 189900,
    originalPrice: 249900,
    image: '/images/13.jpeg',
    description: 'Reloj cronógrafo de acero inoxidable con diseño elegante y funcional.',
    features: ['Cronógrafo', 'Acero Inoxidable', 'Resistente al agua 30m'],
    inStock: true,
  },
  {
    id: 2,
    name: 'CURREN Chronograph Black',
    brand: 'CURREN',
    price: 199900,
    originalPrice: 259900,
    image: '/images/14.jpeg',
    description: 'Edición especial en negro con detalles en rojo.',
    features: ['Cronógrafo', 'Acero Inoxidable', 'Correa de metal'],
    inStock: true,
  },
  {
    id: 3,
    name: 'CURREN Chronograph Gold',
    brand: 'CURREN',
    price: 219900,
    originalPrice: 279900,
    image: '/images/15.jpeg',
    description: 'Diseño sofisticado con acabados en dorado y negro.',
    features: ['Cronógrafo', 'Acero Inoxidable', 'Tachymeter'],
    inStock: true,
  },
  {
    id: 4,
    name: 'CURREN Classic Black Gold',
    brand: 'CURREN',
    price: 179900,
    originalPrice: 229900,
    image: '/images/16.jpeg',
    description: 'Reloj clásico con detalles en oro rosa y negro mate.',
    features: ['24 horas', 'Calendario', 'Cronógrafo'],
    inStock: true,
  },
  {
    id: 5,
    name: 'GUESS Executive Black',
    brand: 'GUESS',
    price: 459900,
    originalPrice: 599900,
    image: '/images/17.jpeg',
    description: 'Reloj ejecutivo de lujo con diseño contemporáneo.',
    features: ['Movimiento Quartz', 'Acero Inoxidable', 'Multifunción'],
    inStock: true,
  },
];

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [watches, setWatches] = useState<Watch[]>(initialWatches);

  const handleAddWatch = (watch: Omit<Watch, 'id'>) => {
    const newWatch = { ...watch, id: Date.now() };
    setWatches(prev => [...prev, newWatch]);
  };

  const handleEditWatch = (watch: Watch) => {
    setWatches(prev => prev.map(w => w.id === watch.id ? watch : w));
  };

  const handleDeleteWatch = (id: number) => {
    setWatches(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
      <main>
        <Hero />
        <Catalog watches={watches} />
        <Service />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)}
        watches={watches}
        onAddWatch={handleAddWatch}
        onEditWatch={handleEditWatch}
        onDeleteWatch={handleDeleteWatch}
      />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
