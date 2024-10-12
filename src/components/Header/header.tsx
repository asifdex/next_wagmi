import React, { useState } from "react";
import { useConnect, useDisconnect, useAccount, useSwitchChain } from "wagmi";
import { mainnet, sepolia, bscTestnet } from "wagmi/chains";

const Header = () => {
  const {  connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { switchChain } = useSwitchChain();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false); 
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

  const metaMaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

  const connectWallet = async (connector: any) => {
    setIsLoading(true);
    try {
      await connector.connect();
      console.log("Wallet connected");
      setError(null);
    } catch (error) {
      setError("Error connecting to wallet. Please try again.");
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = (connector: any) => {
    connectWallet(connector);
  };

  const handleDisconnect = () => {
    setIsLoading(true);
    try {
      disconnect();
      console.log("Disconnected from wallet");
      setError(null);
      setShowProfile(false); 
    } catch (error) {
      setError("Error disconnecting from wallet. Please try again.");
      console.error("Error disconnecting from wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchChain = (chainId: number) => {
    if (switchChain) {
      try {
       switchChain({ chainId });
        setError(null);
      } catch (error) {
        setError("Error switching chain. Please try again.");
        console.error("Error switching chain:", error);
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <p>Connecting...</p>
      ) : isConnected ? (
        <>
          <button onClick={toggleProfile}>
            {showProfile ? "Hide Profile" : "See Profile"}
          </button>
          {showProfile && (
            <div className="flex flex-col items-center mt-2">
              {address && (
                <p className="font-bold">{shortenAddress(address)}</p>
              )}
              <button
                onClick={handleDisconnect}
                className="mt-2 bg-red-500 text-white p-1 rounded"
              >
                Disconnect
              </button>
            </div>
          )}
          <div className="relative">
            <button onClick={toggleDropdown} className="mt-2">
              Change Chain
            </button>
            {dropdownVisible && (
              <div className="absolute bg-white border text-black border-gray-300 rounded shadow-lg mt-1">
                <button
                  onClick={() => handleSwitchChain(mainnet.id)}
                  className="block p-2 hover:bg-gray-100"
                >
                  Ethereum
                </button>
                <button
                  onClick={() => handleSwitchChain(sepolia.id)}
                  className="block p-2 hover:bg-gray-100"
                >
                  Sepolia
                </button>
                <button
                  onClick={() => handleSwitchChain(bscTestnet.id)}
                  className="block p-2 hover:bg-gray-100"
                >
                  BSC Testnet
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        metaMaskConnector && (
          <button onClick={() => handleConnect(metaMaskConnector)}>
            Connect with MetaMask
          </button>
        )
      )}
    </div>
  );
};

export default Header;
