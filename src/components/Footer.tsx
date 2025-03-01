import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">JackStore</h3>
            <p className="mb-4">Tu tienda de confianza para los mejores productos con precios competitivos y servicio excepcional.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition">Sobre Nosotros</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contacto</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition">Preguntas Frecuentes</Link></li>
              <li><Link href="/support" className="hover:text-white transition">Soporte</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Información</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="hover:text-white transition">Envíos</Link></li>
              <li><Link href="/returns" className="hover:text-white transition">Devoluciones</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition">Garantía</Link></li>
              <li><Link href="/financing" className="hover:text-white transition">Financiamiento</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacidad</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contáctanos</h3>
            <ul className="space-y-2">
              <li>Calle Principal #123, Ciudad</li>
              <li>Teléfono: (123) 456-7890</li>
              <li>Email: info@techstore.com</li>
              <li>Lunes - Viernes: 9:00 - 18:00</li>
              <li>Sábado: 10:00 - 14:00</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} TechStore. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><Link href="/terms" className="hover:text-white transition">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Política de Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}