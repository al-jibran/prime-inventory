const useRefresh = () => {
  let refresh = false;

  const setRefresh = (change) => {
    refresh = change;
  };

  return [refresh, setRefresh];
};

export default useRefresh;
