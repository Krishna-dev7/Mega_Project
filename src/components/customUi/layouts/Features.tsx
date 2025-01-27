function FeatureCategory({ categories = [{
  image: "https://source.unsplash.com/featured/?fashion",
  alt: "Fashion",
  name: "Fashion",
}] }) {
  return (
    <section
      className="py-16 "
      aria-label="Featured Categories"
    >
      <h2 className="text-3xl font-semibold text-center mb-10">
        Shop By Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5 md:px-10">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md shadow-lg aspect-[2/3] group"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Title */}
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-medium drop-shadow-lg">
              {category.name}
            </h3>

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureCategory;
