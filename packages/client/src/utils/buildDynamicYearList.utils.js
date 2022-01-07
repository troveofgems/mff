export const buildDynamicYearList = beginAtYear => {
  const yearList = [];
  const limit = beginAtYear || 105;
  for (let i = 0; i < limit; i += 1) {
    if (i >= 12) {
      let year = new Date().getFullYear() - i;
      yearList.push({
        id: i,
        label: `${year}`,
        value: `${year}`
      });
    }
  }
  return yearList;
};