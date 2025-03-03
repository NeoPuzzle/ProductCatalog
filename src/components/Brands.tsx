import Image from "next/image";

export function Brands() {
  const brands = [
    { name: "Apple", logo: "/images/apple.jpg" },
    { name: "Monark", logo: "/images/monark.jpg" },
    { name: "Nike", logo: "/images/nike.jpg" },
    { name: "Lego", logo: "/images/lego.jpg" },
    { name: "Microsoft", logo: "/images/microsoft.jpg" },
    { name: "Puma", logo: "/images/puma.jpg" },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Nuestras Marcas</h2>
          <p className="text-gray-600">Trabajamos con las mejores marcas del mundo</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="grayscale hover:grayscale-0 transition duration-300 flex justify-center"
            >
              <Image
                src={brand.logo}
                alt={`Logo de ${brand.name}`}
                width={100}
                height={48}
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}