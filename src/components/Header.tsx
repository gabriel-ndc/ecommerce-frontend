import { Button, Flex, Heading } from "@chakra-ui/react";

export function Header() {
    return (
        <Flex as="header" justify="space-between">
            <Heading>Ecommerce Demo</Heading>

            <Button>Home</Button>
        </Flex>
    )
}