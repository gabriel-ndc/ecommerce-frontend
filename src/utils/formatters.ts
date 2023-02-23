
export function integerPriceToReals(integerPriceInCents: number) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    return formatter.format(integerPriceInCents/100)
}