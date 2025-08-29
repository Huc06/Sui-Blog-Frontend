import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { SuiClient } from '@mysten/sui/client';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

const suiClient = new SuiClient({ url: 'https://fullnode.testnet.sui.io:443' });

export function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={{ testnet: suiClient }} defaultNetwork="testnet">
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}