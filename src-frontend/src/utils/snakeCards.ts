import axios from "axios";

// import types
import { SnakeCardData } from "../types";

// import constants
import { constant } from "../constants";

const getAllSnakes: () => Promise<Array<SnakeCardData>> = () => {
  return new Promise<Array<SnakeCardData>>((resolve, reject) => {
    try {
      axios
        .get<Array<SnakeCardData>>(constant.app.apiUrl + "snakes")
        .then((res) => {
          resolve(res.data);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export { getAllSnakes };
