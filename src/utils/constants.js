export const colors = {
    black1: "#09090b",
    blue1: '#22d3ee',
    darkGrey: "#171717;",
    lightText: '#d4d4d4',
    lightGrey: "#9ca3af",
    fail: "#ef4444",
    success: "#22c55e"
}

export const genders = [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Prefer not to say', value: '3' },
];

export const langs = [
    { label: 'English', value: '1' },
    { label: 'Urdu', value: '2' },
    { label: 'Spanish', value: '3' },
];

export const ageOptions = Array.from({ length: 83 }, (_, i) => ({
    label: `${i + 18}`,
    value: `${i + 18}`,
}));