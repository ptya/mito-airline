const today = new Date();
let tomorrow = new Date();
let later = new Date();
tomorrow.setDate(today.getDate() + 1);
later.setDate(today.getDate() + 2);

export const dateToday = {
  date: today,
  day: today.getDate(),
  month: today.getMonth(),
  fullMonth: today.toLocaleString("en-gb", { month: "long" }),
  shortMonth: today.toLocaleString("en-gb", { month: "short" }),
  fullWeekday: today.toLocaleString("en-gb", { weekday: "long" }),
  weekday: today.toLocaleString("en-gb", { weekday: "short" }),
  year: today.getFullYear(),
  time: "00:00",
  isoDate: `${today.getFullYear()}-${
    today.getMonth() + 1 < 10 ? "0" : ""
  }${today.getMonth() + 1}-${today.getDate() < 10 ? "0" : ""}${today.getDate()}`
};

export const dateTomorrow = {
  date: tomorrow,
  day: tomorrow.getDate(),
  month: tomorrow.getMonth(),
  fullMonth: tomorrow.toLocaleString("en-gb", { month: "long" }),
  shortMonth: tomorrow.toLocaleString("en-gb", { month: "short" }),
  fullWeekday: tomorrow.toLocaleString("en-gb", { weekday: "long" }),
  weekday: tomorrow.toLocaleString("en-gb", { weekday: "short" }),
  year: tomorrow.getFullYear(),
  time: "00:00",
  isoDate: `${tomorrow.getFullYear()}-${
    tomorrow.getMonth() + 1 < 10 ? "0" : ""
  }${tomorrow.getMonth() + 1}-${
    tomorrow.getDate() < 10 ? "0" : ""
  }${tomorrow.getDate()}`
};

export const dateLater = {
  date: later,
  day: later.getDate(),
  month: later.getMonth(),
  fullMonth: later.toLocaleString("en-gb", { month: "long" }),
  shortMonth: later.toLocaleString("en-gb", { month: "short" }),
  fullWeekday: later.toLocaleString("en-gb", { weekday: "long" }),
  weekday: later.toLocaleString("en-gb", { weekday: "short" }),
  year: later.getFullYear(),
  time: "00:00",
  isoDate: `${later.getFullYear()}-${
    later.getMonth() + 1 < 10 ? "0" : ""
  }${later.getMonth() + 1}-${later.getDate() < 10 ? "0" : ""}${later.getDate()}`
};

export const stationOne = {
  iata: "BCN",
  latitude: 41.3,
  longitude: 2.0833,
  shortName: "Barcelona",
  connections: [
    {
      iata: "BUD",
      operationStartDate: "2019-07-08T19:26:29+0000",
      rescueEndDate: "2019-07-08T19:26:29+0000"
    }
  ]
};

export const stationTwo = {
  iata: "BUD",
  latitude: 47.4367,
  longitude: 19.2556,
  shortName: "Budapest",
  connections: [
    {
      iata: "BCN",
      operationStartDate: "2019-07-08T19:26:29+0000",
      rescueEndDate: "2019-07-08T19:26:29+0000"
    }
  ]
};

export const stations = [stationOne, stationTwo];

export const flight = {
  carrierCode: "W6",
  flightNumber: "5cffb38e1f0a3c099d7b3e26",
  remainingTickets: 39,
  departure: `2019-07-12T10:30:00+0200`,
  arrival: `2019-07-12T13:30:00+0200`,
  fares: [
    {
      fareSellKey: "5cffb38e4fb998c79f11ed2c",
      price: 70,
      bundle: "basic"
    },
    {
      fareSellKey: "5cffb38eb28cf9b1e34ca701",
      price: 76,
      bundle: "standard"
    },
    {
      fareSellKey: "5cffb38e0f6af61b3d01f764",
      price: 101,
      bundle: "plus"
    }
  ]
};

export const flightsOneToTwo = mockDate => [
  {
    carrierCode: "W6",
    flightNumber: "5cffb38e4b990d5c859c4c49",
    remainingTickets: 21,
    departure: `${mockDate.isoDate}T00:00:00+0200`,
    arrival: `${mockDate.isoDate}T10:10:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38e5490dbf23c142993",
        price: 44,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38e2d92f2bb29ec1a3d",
        price: 52,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38ebfa2b04243e565ff",
        price: 75,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38e1f0a3c099d7b3e26",
    remainingTickets: 39,
    departure: `${mockDate.isoDate}T10:30:00+0200`,
    arrival: `${mockDate.isoDate}T13:30:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38e4fb998c79f11ed2c",
        price: 70,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38eb28cf9b1e34ca701",
        price: 76,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38e0f6af61b3d01f764",
        price: 101,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38eb1c12aa3525a4192",
    remainingTickets: 20,
    departure: `${mockDate.isoDate}T13:00:00+0200`,
    arrival: `${mockDate.isoDate}T16:00:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38efda96e33a72fb349",
        price: 59,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38ec6ed57d8574b2fb2",
        price: 64,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38ea874dbc2da68398c",
        price: 90,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38ef23c797a552a8cc2",
    remainingTickets: 36,
    departure: `${mockDate.isoDate}T16:10:00+0200`,
    arrival: `${mockDate.isoDate}T19:10:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38e24a3e24372acb5ed",
        price: 45,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38e097565fc64d5a28a",
        price: 51,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38e12756354b114214f",
        price: 77,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38e7dcfc3ee939b7717",
    remainingTickets: 30,
    departure: `${mockDate.isoDate}T19:40:00+0200`,
    arrival: `${mockDate.isoDate}T22:40:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38e214e9939a94f3832",
        price: 52,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38e0a17403b7366e162",
        price: 62,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38ec43d3dc6cb95cb8b",
        price: 91,
        bundle: "plus"
      }
    ]
  }
];

export const flightsTwoToOne = mockDate => [
  {
    carrierCode: "W6",
    flightNumber: "5cffb38ed7447af6678d5d8f",
    remainingTickets: 31,
    departure: `${mockDate.isoDate}T06:10:00+0200`,
    arrival: `${mockDate.isoDate}T09:10:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38e8c3e32cc422832aa",
        price: 74,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38ed0f92c10934aa41e",
        price: 80,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38e434fe9cd021c4fe7",
        price: 110,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38e1e5c0ba47d506cd9",
    remainingTickets: 37,
    departure: `${mockDate.isoDate}T09:40:00+0200`,
    arrival: `${mockDate.isoDate}T12:40:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38ebc065310800ba86e",
        price: 45,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38e2aba6632e9e8e8b2",
        price: 53,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38e6a56653a80f57e4f",
        price: 78,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38e083a10cb11b6d57e",
    remainingTickets: 43,
    departure: `${mockDate.isoDate}T13:00:00+0200`,
    arrival: `${mockDate.isoDate}T16:00:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38e99069d63b9596bb4",
        price: 42,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38ef23f74b9a4ad7bd4",
        price: 52,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38eda6e8f8ed44f86fb",
        price: 76,
        bundle: "plus"
      }
    ]
  },
  {
    carrierCode: "W6",
    flightNumber: "5cffb38e21ef1a80eb22c2ab",
    remainingTickets: 49,
    departure: `${mockDate.isoDate}T16:50:00+0200`,
    arrival: `${mockDate.isoDate}T19:50:00+0200`,
    fares: [
      {
        fareSellKey: "5cffb38ece4229670922383a",
        price: 64,
        bundle: "basic"
      },
      {
        fareSellKey: "5cffb38e29d73f0e1514fba8",
        price: 71,
        bundle: "standard"
      },
      {
        fareSellKey: "5cffb38e776201a6619f99f0",
        price: 96,
        bundle: "plus"
      }
    ]
  }
];
