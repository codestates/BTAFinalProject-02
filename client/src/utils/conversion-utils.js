export const BeddowsToLSK = (amount) => (amount / 100000000).toFixed(6);
export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear().toString();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const second = ('0' + date.getSeconds()).slice(-2);
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
};
