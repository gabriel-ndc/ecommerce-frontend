import { Box, ChakraProvider, Divider, Flex, Grid, Spinner, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { ProductCard } from './components/ProductCard'
import { ShoppingCart } from './components/ShoppingCart'
import { ShoppingCartProvider } from './hooks/useShoppingCart'
import { Product } from './models/interfaces'
import { axiosInstance } from './utils/axios'

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const products = await (await axiosInstance.get<Product[]>("/products")).data;
      console.log(products);
      setProducts(products);
    } catch(e) {
      console.error(e);
      toast({
        title: "Não foi possível carregar os produtos",
        description: "Por favor, recarregue a página",
        status: "error",
        duration: 9000,
        isClosable: false
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <ChakraProvider>
      <ShoppingCartProvider>
        <Box m={"12"}>
          <Header />
          <Divider my="6" />

          {
            isLoading ? <Spinner size="xl" /> : (
              <Flex justify="space-between" align="flex-start">
                <Grid templateColumns="repeat(3, 1fr)" alignItems="flex-start" gap="3">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}

                </Grid>
                <ShoppingCart />
              </Flex>
            )
          }
        </Box>
      </ShoppingCartProvider>
    </ChakraProvider>
  )
}

export default App
