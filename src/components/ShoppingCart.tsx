import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, ListItem, UnorderedList, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { integerPriceToReals } from "../utils/formatters";

export function ShoppingCart() {
    const { products, totalPrice, checkout, clearCart } = useShoppingCart();
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
    const toast = useToast();

    async function executeCheckout() {
        setIsLoadingCheckout(true);
        try {
            const response = await checkout();
            console.log(response)

            if (response.status === "SUCCESS") {
                toast({
                    title: "Compra feita com sucesso!",
                })
                clearCart()
            } else {
                toast({
                    title: "Falha no pagamento!",
                    status: "error"
                })
            }
        } catch(e) {
            toast({
                description: JSON.stringify(e)
            })
        } finally {
            setIsLoadingCheckout(false);
        }
    }

    return (
        <Card maxW="sm" minW="300" bg={"red"}>
            <CardHeader>
                <Heading color="white" size="lg" textAlign="center">
                    Carrinho
                </Heading>
            </CardHeader>
            <Divider color="white" />
            <CardBody>
                <Heading color="white" size="lg">
                    Total: {integerPriceToReals(totalPrice)}
                </Heading>
                <Divider my="3" />
                <Heading color="white" size="md">
                    Itens:
                </Heading>
                <UnorderedList>
                    {products.map((product,i) => (
                        <ListItem key={`${product.name}-${i}`} color="white">
                            {product.quantity} - {product.name} - {integerPriceToReals(product.unitPrice)}
                        </ListItem>
                    ))}
                </UnorderedList>
            </CardBody>
            <Divider color="white" />
            <CardFooter>
                <Button 
                    isLoading={isLoadingCheckout} 
                    color="white" 
                    textColor="black" 
                    flex="1"
                    onClick={executeCheckout}
                >
                    Finalizar Compra
                </Button>
            </CardFooter>
        </Card>
    )
}