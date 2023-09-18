export const data = () => {
  let dataSet = [];
  for (let i = 0; i <= 299; i++) {
    dataSet.push(
      `https://public-cdn.metahero.io/use-case-sequence/1440/MH_USECASES${
        i < 10 ? `00${i}` : i < 100 ? `0${i}` : i
      }.png.jpeg`
    );
  }

  return dataSet;
};
