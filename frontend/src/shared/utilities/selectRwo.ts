function selectRow<T extends HTMLElement>(
  selectRef: React.RefObject<(T | null)[]>,
  index: number
) {
  selectRef.current.forEach((element) => {
    if (element) {
      element.style.background = "";
    }
  });

  const element = selectRef.current[index];

  if (element) {
    element.style.background = "#cfcfcf";
  }
}

export default selectRow;