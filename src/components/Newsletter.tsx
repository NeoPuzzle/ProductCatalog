export function Newsletter() {
    return (
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Mantente Actualizado</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Suscríbete a nuestro boletín y recibe las últimas noticias, lanzamientos y ofertas exclusivas.</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <button 
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    );
  }