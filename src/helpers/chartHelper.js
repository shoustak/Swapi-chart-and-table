export const getBarHeight = (planets) => {

    return planets.map(({ population, name }) => {
      let height = Math.floor(Math.log2(parseInt(population))) / 0.1;
      return { name, height, population };
    });
  };
  