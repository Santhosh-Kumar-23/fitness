import {useState, useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';

const useOrientation = () => {
  // UseState Variables
  const [orientation, setOrientation] = useState(null);

  // Other Variables
  const initialDeviceOrientation = Orientation.getInitialOrientation();

  useEffect(() => {
    onOrientationDidChange = deviceOrientation => {
      setOrientation(deviceOrientation);
    };

    Orientation.addOrientationListener(onOrientationDidChange);

    return () => {
      Orientation.removeOrientationListener(onOrientationDidChange);
    };
  });

  return orientation || initialDeviceOrientation;
};

export default useOrientation;
