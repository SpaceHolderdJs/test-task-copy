export function generateRandomFormattedDate() {
    const randomDate = new Date(
        new Date().getFullYear(),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
            Math.floor(Math.random() * 12) + 1,
            Math.floor(Math.random() * 60)
    );

    return randomDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}
