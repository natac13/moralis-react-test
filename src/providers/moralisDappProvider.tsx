import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const MoralisDappContext = React.createContext();

const MoralisDappProvider: React.FC = ({ children }) => {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  useEffect(() => {
    Moralis.onChainChanged((chain) => {
      setChainId(chain);
    });

    Moralis.onAccountsChanged((address) => {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get("ethAddress")
      ),
    [web3, user]
  );

  return (
    <MoralisDappContext.Provider value={{ walletAddress, chainId }}>
      {children}
    </MoralisDappContext.Provider>
  );
};

const useMoralisDapp = () => {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
};

export { MoralisDappProvider, useMoralisDapp };
