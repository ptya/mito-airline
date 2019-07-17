import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";
require("jest-localstorage-mock");
global.fetch = require("jest-fetch-mock");
