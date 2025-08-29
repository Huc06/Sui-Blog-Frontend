import { useEffect } from 'react';
import { useSuiClientContext } from '@mysten/dapp-kit';
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';

export function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext();

  useEffect(() => {
    console.log('ENOKI network:', network);
    if (!isEnokiNetwork(network)) {
      console.warn('Not an Enoki network, skip register');
      return;
    }
    if (!import.meta.env.VITE_ENOKI_API_KEY) console.warn('Missing VITE_ENOKI_API_KEY');
    if (!import.meta.env.VITE_ENOKI_GOOGLE_CLIENT_ID &&
        !import.meta.env.VITE_ENOKI_FACEBOOK_CLIENT_ID &&
        !import.meta.env.VITE_ENOKI_TWITCH_CLIENT_ID) {
      console.warn('No provider clientId configured');
    }

    try {
      const { unregister } = registerEnokiWallets({
        client: client as any,
        network,
        apiKey: import.meta.env.VITE_ENOKI_API_KEY as string,
        providers: {
          google: import.meta.env.VITE_ENOKI_GOOGLE_CLIENT_ID
            ? { clientId: import.meta.env.VITE_ENOKI_GOOGLE_CLIENT_ID }
            : undefined,
        },
      });
      console.log('ENOKI registered');
      return unregister;
    } catch (e) {
      console.error('ENOKI register error', e);
    }
  }, [client, network]);

  return null;
}
