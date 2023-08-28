import axios from "axios";
import Cookies from "./Cookies";
class API {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API;
    this.apiUrl = process.env.REACT_APP_BASE;
    this.currency = "Rs";
    this.cookies = Cookies;
    axios.defaults.headers.common["Authorization"] = `Bearer ${this.cookies.get(
      "admin_token"
    )}`;
  }

  async callAPI(method, dispatch, actions, url, data, callback) {
    const [startAction, successAction, errorAction, actionType] = actions;
    if (startAction) {
      dispatch(startAction());
    }
    try {
      const res = await method(`${this.baseUrl}${url}`, data);
      if (successAction) {
        dispatch(successAction({ type: actionType, data: res.data }));
      }
      if (callback) {
        callback(null, res);
      }
      return res;
    } catch (error) {
      if (errorAction) {
        dispatch(errorAction(error.message));
      }
      if (callback) {
        callback(error, null);
      }
      return error;
    }
  }

  async getAll(dispatch, actions, url, params = {}, callback) {
    return this.callAPI(
      axios.get,
      dispatch,
      actions,
      url,
      { params },
      callback
    );
  }

  async getSingle(dispatch, actions, url, params, callback) {
    return this.callAPI(
      axios.get,
      dispatch,
      actions,
      `${url}/${params}`,
      {},
      callback
    );
  }

  async create(dispatch, actions, url, data, callback) {
    return this.callAPI(axios.post, dispatch, actions, url, data, callback);
  }

  async update(dispatch, actions, url, params, data, callback) {
    return this.callAPI(
      axios.put,
      dispatch,
      actions,
      `${url}/${params}`,
      data,
      callback
    );
  }

  async remove(dispatch, actions, url, params, callback) {
    return this.callAPI(
      axios.delete,
      dispatch,
      actions,
      `${url}/${params}`,
      {},
      callback
    );
  }

  async removeMany(dispatch, actions, url, data, callback) {
    return this.callAPI(
      axios.delete,
      dispatch,
      actions,
      url,
      { data },
      callback
    );
  }
}

export default API;
