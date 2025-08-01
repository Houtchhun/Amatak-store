import ProductCard from "@/components/product-card"

export default function ProductList({ products, showQuantity }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
          <ProductCard
            {...product}
            sizes={product.sizes || ["M"]}
            colors={product.colors || []}
            inStock={product.inStock !== false}
          />
          {showQuantity && product.quantity && (
            <div className="mt-2 text-sm text-gray-600">
              Stock: {product.quantity} available
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
