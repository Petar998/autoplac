export const years = [];

for (let i = 1950; i < parseInt(new Date().getFullYear()) + 1; i++) {
    years.push({ label: i.toString(), value: i.toString() })
}
