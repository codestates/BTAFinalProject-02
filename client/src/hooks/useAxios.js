import _axios from '../utils/axios-utils';

export const getBlockList = async (page) => {
  return await _axios.get(`/blocks/${page}`);
};
export const getBlockById = async (id) => {
  return await _axios.get(`/blocks/id/${id}`);
};
export const getBlockByHeight = async (height) => {
  return await _axios.get(`/blocks/height/${height}`);
};
export const getTransactionList = async (page) => {
  return await _axios.get(`/transactions/${page}`);
};
export const getTransactionById = async (id) => {
  return await _axios.get(`/transactions/id/${id}`);
};
