export const tableheaderArray = [
    {
        name: "Request ID",
    },
    {
        name: "Progress",
    },
    {
        name: "Item",
    },
    {
        name: "Created At",
    },
];

export const arrayForStateSelect = ["draft", "pending", "complete"].map(
    (value) => ({
        value,
        label: `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`,
    })
);

export const grayColor = "#6A7383";
