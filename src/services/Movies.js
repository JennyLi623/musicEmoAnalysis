import Socket from "../util/Socket";
import { moviesEPs } from "../Config.json";

const { searchEP, browseEP, getEP } = moviesEPs;

async function search(params) {
  return await Socket.GET(searchEP + params);
}

async function browse(params) {
  return await Socket.GET(browseEP + params);
}

async function get(params) {
  return await Socket.GET(getEP + params);
}

export default {
  search, browse, get
};
