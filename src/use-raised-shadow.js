import { animate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';

export function useRaisedShadow(value) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;

    // Subscribe to the value updates
    value.onChange((latest) => {
      const wasActive = isActive;

      // Check if the value is non-zero to activate the shadow
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)');
        }
      } else {
        // Deactivate the shadow when value is 0
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}
