import { Products } from "./components/Products"
import { products as initialProducts } from "./mocks/products.json"
import { Header } from "./components/Header"
import { useFilters } from "./hooks/useFilters"
import { Footer } from "./components/Footer"
import { Cart } from "./components/Cart"
import { CartProvider } from "./context/cart"

function App() {
  const { filterProducts } = useFilters()
  const filteredProducts = filterProducts(initialProducts)

  // * Se hace uso de Prop Drilling para cambiar el estado de filter
  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  )
}

export default App
