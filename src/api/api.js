import axios from "axios";

export const fetchVehicles = async (url) => {
  let nextPage = url;
  let vehiclesData = [];
  let vehiclesAndPilotsData = [];

  while (nextPage) {
    const res = await axios.get(nextPage);
    const { next, results } = await res.data;
    nextPage = next;
    vehiclesData = [...vehiclesData, results];
  }

  vehiclesData
    .flat()
    .filter((e) => e.pilots.length)
    .forEach((t) => {
      const { name, pilots } = t;
      vehiclesAndPilotsData = [...vehiclesAndPilotsData, [name, pilots]];
    });

  return vehiclesAndPilotsData;
};

/*----------------------------------------------*/

export const setPilots = async (vehiclesAndPilotsData) => {
  let data = [];

  vehiclesAndPilotsData.forEach((e) => {
    e[1].forEach((t) => {
      data.push(t);
    });
  });

  const fetchAll = async (urls) => {
    const res = await Promise.all(urls.map((u) => axios.get(u)));
    const data = await Promise.all(res.map((r) => r.data));
    return data;
  };

  const pilots = await fetchAll([...new Set(data)]);

  vehiclesAndPilotsData.forEach((e) => {
    let item = e[1];
    item.forEach((i, index) => {
      item[index] = pilots.filter((p) => p.url === item[index])[0];
    });
  });

  return vehiclesAndPilotsData;
};

/*----------------------------------------------*/

export const setPlanets = async (pilotsData) => {
  let data = [];

  pilotsData.forEach((e) => {
    e[1].forEach((t) => {
      data.push(t.homeworld);
    });
  });

  const fetchAll = async (urls) => {
    const res = await Promise.all(urls.map((u) => axios.get(u)));
    const data = await Promise.all(res.map((r) => r.data));
    return data;
  };

  const homeworlds = await fetchAll([...new Set(data)]);

  pilotsData.forEach((e) => {
    let item = e[1];
    let sum = 0;
    item.forEach((i, index) => {
      item[index] = [
        item[index].name,
        homeworlds.filter((p) => p.url === item[index].homeworld)[0].name,
        homeworlds.filter((p) => p.url === item[index].homeworld)[0].population
      ];
      sum += parseInt(item[index][2], 10);
    });
    e.push(sum);
  });

  return pilotsData;
};


/*----------------------------------------------*/

export const calculateHighest = async (data) => {
  let max = { maximum: 0, index: 0 };

  data.forEach((d, i) => {
    if (d[2] > max.maximum) {
      max.maximum = d[2];
      max.index = i;
    }
  });
  return data[max.index];
};


/*----------------------------------------------*/

export const getPlanetsGraph = async (url, list) => {

  let nextPage = url;
  let data = [];

  while (nextPage) {
    const res = await axios.get(nextPage);
    const { next, results } = await res.data;
    nextPage = next;
    data = [...data, results];
  }

  const planetsObjectsList = data.flat()

  const relaventPlanets = list.reduce((arr, curr) => {
    const d = planetsObjectsList.filter((p) => p.name === curr)
    const { name, population } = d[0]
    arr.push({ name, population })
    return arr;
  }, []);

  return relaventPlanets;

};