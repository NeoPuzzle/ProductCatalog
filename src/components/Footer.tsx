import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4">JackStore</h3>
            <p className="mb-4">
              Tu tienda de confianza para los mejores productos con precios competitivos y servicio excepcional.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition focus-visible:ring">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition focus-visible:ring">
                <Twitter className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition focus-visible:ring">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white transition focus-visible:ring">
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <nav aria-labelledby="enlaces-rapidos">
            <h3 id="enlaces-rapidos" className="text-white text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition focus-visible:ring">Sobre Nosotros</Link></li>
              <li><Link href="/contact" className="hover:text-white transition focus-visible:ring">Contacto</Link></li>
              <li><Link href="/blog" className="hover:text-white transition focus-visible:ring">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition focus-visible:ring">Preguntas Frecuentes</Link></li>
              <li><Link href="/support" className="hover:text-white transition focus-visible:ring">Soporte</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="informacion">
            <h3 id="informacion" className="text-white text-lg font-bold mb-4">Información</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="hover:text-white transition focus-visible:ring">Envíos</Link></li>
              <li><Link href="/returns" className="hover:text-white transition focus-visible:ring">Devoluciones</Link></li>
              <li><Link href="/warranty" className="hover:text-white transition focus-visible:ring">Garantía</Link></li>
              <li><Link href="/financing" className="hover:text-white transition focus-visible:ring">Financiamiento</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition focus-visible:ring">Privacidad</Link></li>
            </ul>
          </nav>

          <address className="not-italic">
            <h3 className="text-white text-lg font-bold mb-4">Contáctanos</h3>
            <ul className="space-y-2">
              <li>Av. La Paz #2580, Lima</li>
              <li>Teléfono: <Link href="tel:+014567890" className="hover:text-white transition focus-visible:ring">(01) 456-7890</Link></li>
              <li>Email: <Link href="mailto:info@jackstore.com" className="hover:text-white transition focus-visible:ring">info@jackstore.com</Link></li>
              <li>Lunes - Viernes: 9:00 - 18:00</li>
              <li>Sábado: 10:00 - 14:00</li>
            </ul>
          </address>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left space-y-4 md:space-y-0">
          <p>&copy; {currentYear} JackStore. Todos los derechos reservados.</p>
          <nav aria-labelledby="politicas">
            <ul id="politicas" className="flex flex-wrap justify-center md:justify-start space-x-4">
              <li><Link href="/terms" className="hover:text-white transition focus-visible:ring">Términos de Servicio</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition focus-visible:ring">Política de Privacidad</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition focus-visible:ring">Política de Cookies</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}