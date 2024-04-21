export function customIntl(typeWords: string[]) {
    const words = [...typeWords];
    return {
        run: (number: number) => {
            if (number % 10 == 1) return `${number} ${words[0]}`
            if (number % 10 == 0) return `${number} ${words[1]}`
            if ((number % 10 >= 2) && (number % 10 <= 4)) return `${number} ${words[2]}`
            if ((number % 10 >= 5) && (number % 10 <= 9)) return `${number} ${words[1]}`
        }
    }
}

// let num = customIntl(["метка", "меток", "метки"]);