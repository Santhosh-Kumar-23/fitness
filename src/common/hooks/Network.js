import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [networkType, setNetworkType] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setNetworkType(state.type);
    });

    // Fetch initial network state
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setNetworkType(state.type);
    });

    return () => unsubscribe();
  }, []);

  return {isConnected, networkType};
};

export default useNetworkStatus;

// We import useEffect and useState from React to manage the hook's state and side effects.
// We import NetInfo from @react-native-community/netinfo.
// We define a custom hook named useNetworkStatus.
// Inside the useEffect hook with an empty dependency array (to run only once), we set up an event listener using NetInfo.addEventListener to listen for network state changes. When the network state changes, we update the isConnected and networkType state variables accordingly.
// We also fetch the initial network state using NetInfo.fetch() and update the state accordingly.
// We return an object containing isConnected and networkType to allow consumers of the hook to access the current network status.
