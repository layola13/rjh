let counter = 0;

export default function generatePrivateName(name: string): string {
    return `__private_${counter++}_${name}`;
}