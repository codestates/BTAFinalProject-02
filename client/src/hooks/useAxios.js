import _axios from '../utils/axios-utils';

export const getBlockList = async (page) => {
  return await _axios.get(`/blocks/${page}`);
};
export const getTransactionList = async (page) => {
  return await _axios.get(`/transactions/${page}`);
};
