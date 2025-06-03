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

export const cityCountry = [
    { label: 'Karachi, Pakistan', value: '1' },
    { label: 'Lahore, Pakistan', value: '2' },
    { label: 'Islamabad, Pakistan', value: '3' },
]

export const sleepQuality = [
    { label: 'Good', value: '1' },
    { label: 'Average', value: '2' },
    { label: 'Poor', value: '3' },]

export const availableTags = [
  { label: 'Lose Weight', value: 'lose_weight' },
  { label: 'Control Blood Pressure', value: 'control_bp' },
  { label: 'Improve Sleep Quality', value: 'sleep_quality' },
  { label: 'Eat Healthy', value: 'eat_healthy' },
  { label: 'Reduce Stress', value: 'reduce_stress' },
  { label: 'Stay Hydrated', value: 'stay_hydrated' },
  { label: 'Build Muscle', value: 'build_muscle' },
  { label: 'Quit Smoking', value: 'quit_smoking' },
  { label: 'Reduce Alcohol Intake', value: 'reduce_alcohol' },
  { label: 'Manage Medication', value: 'manage_medication' },
  { label: 'Boost Energy', value: 'boost_energy' },
  { label: 'Improve Mental Health', value: 'mental_health' },
  { label: 'Enhance Focus', value: 'enhance_focus' },
  { label: 'Improve Digestion', value: 'digestion' },
  { label: 'Control Blood Sugar', value: 'blood_sugar' },
  { label: 'Monitor Vitals', value: 'monitor_vitals' },
  { label: 'Be More Active', value: 'be_active' },
  { label: 'Improve Skin Health', value: 'skin_health' },
];
