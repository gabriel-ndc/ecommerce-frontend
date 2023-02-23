import { Button, Card, CardBody, CardFooter, Divider, Heading, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useShoppingCart } from "../hooks/useShoppingCart";
import { Product } from "../models/interfaces";
import { integerPriceToReals } from "../utils/formatters";

interface Props {
    product: Product;
}

export function ProductCard({product}: Props) {
    const { addToCart } = useShoppingCart();
    const [quantity, setQuantity] = useState(1);

    const { name, id, pictureUrl, price } = product;

    function onClick() {
        if (quantity > 0) {
            addToCart({
                id,
                name,
                quantity,
                unitPrice: price
            })
            setQuantity(1);
        }
    }

    return (
        <Card maxW="sm">
            <CardBody>
                <Image 
                    src={pictureUrl}
                    alt={name}
                    borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                    <Heading size="md">
                        {name}
                    </Heading>
                    <Text color="blue.600" fontSize="2xl">
                        {integerPriceToReals(price)}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter justify="space-between">
                    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                    <Button 
                        colorScheme="blue"
                        onClick={onClick}
                    >
                        Add to Cart
                    </Button>
            </CardFooter>
        </Card>
    )
}

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (newQuantity: number) => void;
}

function QuantitySelector({quantity, setQuantity}: QuantitySelectorProps) {
    return (
        <NumberInput maxW="20" value={quantity} onChange={value => setQuantity(Number.parseInt(value))}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}