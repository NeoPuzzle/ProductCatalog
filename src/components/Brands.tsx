export function Brands() {
    const brands = [
      { name: 'Apple', logo: '/api/placeholder/150/80' },
      { name: 'Samsung', logo: '/api/placeholder/150/80' },
      { name: 'Sony', logo: '/api/placeholder/150/80' },
      { name: 'Google', logo: '/api/placeholder/150/80' },
      { name: 'Microsoft', logo: '/api/placeholder/150/80' },
      { name: 'Dell', logo: '/api/placeholder/150/80' },
    ];
  
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Nuestras Marcas</h2>
            <p className="text-gray-600">Trabajamos con las mejores marcas del mundo</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition duration-300">
                <img src={brand.logo} alt={`${brand.name} logo`} className="h-12" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }