import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
require("jest-localstorage-mock");
global.fetch = require("jest-fetch-mock");
