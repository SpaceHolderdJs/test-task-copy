import { Statuses } from "@/types/statuses";

export const generateRandomStatus = () => {
    const statuses = ['Pending', 'Draft', 'Complete'];

    return statuses[Math.floor(Math.random() * statuses.length)] as keyof typeof Statuses;
}
