"use client";
import React from "react";

function MainComponent() {
  const [currentPage, setCurrentPage] = React.useState("welcome");
  const [miningStartTime, setMiningStartTime] = React.useState(null);
  const [level, setLevel] = React.useState(1);
  const [tokens, setTokens] = React.useState(0);
  const [miningDetails, setMiningDetails] = React.useState({
    timeLeft: "",
    progress: 0,
  });
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [selectedWallet, setSelectedWallet] = React.useState(null);

  React.useEffect(() => {
    if (miningStartTime) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timePassed = now - miningStartTime;
        const totalTime = 8 * 60 * 60 * 1000;
        const timeLeft = totalTime - timePassed;

        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (60 * 60 * 1000));
          const minutes = Math.floor(
            (timeLeft % (60 * 60 * 1000)) / (60 * 1000)
          );
          setMiningDetails({
            timeLeft: `${hours}h ${minutes}m`,
            progress: (timePassed / totalTime) * 100,
          });
        } else {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [miningStartTime]);

  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://ucarecdn.com/dd4d32c1-3107-456d-abbe-c1517dfc76e1/-/format/auto/')] bg-center bg-cover opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#40E0D0] mb-6 font-russo-one tracking-tight">
          Horse Token Mining
        </h1>
        <button
          onClick={() => setCurrentPage("home")}
          className="bg-gradient-to-r from-[#00FFFF] to-[#40E0D0] text-[#121212] font-bold py-4 px-12 rounded-xl hover:scale-105 transition-all font-poppins mx-auto shadow-xl mb-8"
        >
          Start Mining
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
          <div className="bg-[#1E1E1E]/50 backdrop-blur-md p-6 rounded-lg border border-[#00FFFF] shadow-[0_8px_32px_0_rgba(0,255,255,0.2)]">
            <h2 className="text-2xl font-bold text-[#00FFFF] mb-4">
              Token Details
            </h2>
            <ul className="text-[#7DF9FF] text-left space-y-2">
              <li>Total Supply: 1,000,000,000 HRT</li>
              <li>Burnt: 0%</li>
              <li>Community Pool: 80%</li>
            </ul>
          </div>
          <div className="bg-[#1E1E1E]/50 backdrop-blur-md p-6 rounded-lg border border-[#00FFFF] shadow-[0_8px_32px_0_rgba(0,255,255,0.2)]">
            <h2 className="text-2xl font-bold text-[#00FFFF] mb-4">Roadmap</h2>
            <ul className="text-[#7DF9FF] text-left space-y-2">
              <li>Q1: Token Launch & Community Building</li>
              <li>Q2: Exchange Listings & Partnerships</li>
              <li>Q3: NFT Integration & Staking</li>
              <li>Q4: Mobile App & Ecosystem Expansion</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a href="#" className="text-[#00FFFF] hover:text-[#7DF9FF]">
            <i className="fab fa-telegram text-2xl"></i>
          </a>
          <a href="#" className="text-[#00FFFF] hover:text-[#7DF9FF]">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="#" className="text-[#00FFFF] hover:text-[#7DF9FF]">
            <i className="fab fa-discord text-2xl"></i>
          </a>
          <a href="#" className="text-[#00FFFF] hover:text-[#7DF9FF]">
            <i className="fab fa-youtube text-2xl"></i>
          </a>
        </div>
      </div>
    </div>
  );

  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E]/90 backdrop-blur-lg p-4 flex justify-around items-center shadow-lg">
      <button
        onClick={() => setCurrentPage("mining")}
        className="text-[#00FFFF] flex flex-col items-center font-poppins"
      >
        <i className="fas fa-hammer text-2xl"></i>
        <span className="text-xs mt-1">Mining</span>
      </button>
      <button
        onClick={() => setCurrentPage("tasks")}
        className="text-[#00FFFF] flex flex-col items-center font-poppins"
      >
        <i className="fas fa-tasks text-2xl"></i>
        <span className="text-xs mt-1">Tasks</span>
      </button>
      <button
        onClick={() => setCurrentPage("referral")}
        className="text-[#00FFFF] flex flex-col items-center font-poppins"
      >
        <i className="fas fa-users text-2xl"></i>
        <span className="text-xs mt-1">Refer</span>
      </button>
      <button
        onClick={() => setCurrentPage("wallet")}
        className="text-[#00FFFF] flex flex-col items-center font-poppins"
      >
        <i className="fas fa-wallet text-2xl"></i>
        <span className="text-xs mt-1">Wallet</span>
      </button>
    </div>
  );

  const TextBox = ({ text }) => (
    <div className="bg-[#1E1E1E] border-2 border-[#00FFFF] rounded-lg p-4 shadow-lg max-w-md mx-auto">
      <p className="text-[#00FFFF] font-poppins">{text}</p>
    </div>
  );

  const MiningPage = () => {
    const canClaim =
      miningStartTime && Date.now() - miningStartTime >= 8 * 60 * 60 * 1000;

    return (
      <div className="min-h-screen relative bg-gradient-to-b from-[#121212] to-[#1E1E1E] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://ucarecdn.com/dd4d32c1-3107-456d-abbe-c1517dfc76e1/-/format/auto/')] bg-cover bg-center opacity-75"></div>
        <div className="relative z-10 p-4 pb-24 w-full max-w-md mx-auto text-center">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#40E0D0] mb-4 font-russo-one">
              Level {level}
            </h2>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7DF9FF] to-[#40E0D0] mb-6 font-poppins">
              {tokens} HRT Tokens
            </p>
            {miningStartTime && !canClaim && (
              <div className="w-full mb-4">
                <div className="bg-[#2a2a2a] rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00FFFF] to-[#40E0D0] h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${miningDetails.progress}%` }}
                  ></div>
                </div>
                <NewComponent
                  text={miningDetails.timeLeft}
                  textColor="#40E0D0"
                  fontWeight="extrabold"
                />
              </div>
            )}
            <button
              onClick={() => {
                if (!miningStartTime) {
                  setMiningStartTime(Date.now());
                } else if (canClaim) {
                  setTokens((prev) => prev + 10);
                  setMiningStartTime(Date.now());
                }
              }}
              className={`relative bg-gradient-to-r from-[#00FFFF] to-[#40E0D0] text-black font-extrabold py-6 px-12 rounded-xl transform hover:scale-105 active:scale-95 transition-all duration-200 font-poppins ${
                !canClaim && miningStartTime ? "opacity-50" : ""
              } shadow-xl`}
            >
              <span className="relative z-10 uppercase tracking-wider text-lg">
                {!miningStartTime
                  ? "Start Mining"
                  : canClaim
                  ? "Claim Tokens"
                  : "Mining in Progress"}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TasksPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] p-4 pb-24">
      <h2 className="text-3xl font-bold text-[#00FFFF] mb-6 font-russo-one text-center">
        Daily Tasks
      </h2>
      <div className="space-y-4">
        <div className="bg-[#1E1E1E] p-4 rounded-lg border border-[#00FFFF]">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <i className="fas fa-play-circle text-[#00FFFF] text-xl"></i>
              <span className="text-[#00FFFF] font-poppins">Watch Video</span>
            </div>
            <button className="bg-[#00FFFF] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#7DF9FF] transition-colors">
              +2 HRT
            </button>
          </div>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-lg border border-[#00FFFF]">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <i className="fas fa-share-alt text-[#00FFFF] text-xl"></i>
              <span className="text-[#00FFFF] font-poppins">
                Share on Social
              </span>
            </div>
            <button className="bg-[#00FFFF] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#7DF9FF] transition-colors">
              +3 HRT
            </button>
          </div>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-lg border border-[#00FFFF]">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <i className="fas fa-check-circle text-[#00FFFF] text-xl"></i>
              <span className="text-[#00FFFF] font-poppins">
                Daily Check-in
              </span>
            </div>
            <button className="bg-[#00FFFF] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#7DF9FF] transition-colors">
              +1 HRT
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ReferralPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] p-4 pb-24">
      <h2 className="text-3xl font-bold text-[#00FFFF] mb-6 font-russo-one text-center">
        Refer Friends
      </h2>
      <div className="bg-[#1E1E1E] p-6 rounded-lg border border-[#00FFFF] mb-6">
        <p className="text-[#00FFFF] text-center mb-4 font-poppins">
          Your Referral Code
        </p>
        <div className="bg-[#2a2a2a] p-3 rounded flex justify-between items-center">
          <span className="text-[#00FFFF] font-mono">HRT123456</span>
          <button className="text-[#00FFFF]">
            <i className="fas fa-copy"></i>
          </button>
        </div>
      </div>
      <div className="text-center text-[#7DF9FF] font-poppins">
        <p>Earn 5 HRT for each referral</p>
        <p className="mt-2">Total Referrals: 0</p>
      </div>
    </div>
  );

  const WalletPage = () => {
    const [showWalletOptions, setShowWalletOptions] = React.useState(false);
    const connectWallet = (walletType) => {
      setSelectedWallet(walletType);
      setWalletConnected(true);
      setShowWalletOptions(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] p-4 pb-24">
        <h2 className="text-3xl font-bold text-[#00FFFF] mb-6 font-russo-one text-center">
          Wallet
        </h2>
        <div className="bg-[#1E1E1E] p-6 rounded-lg border border-[#00FFFF] mb-6">
          <div className="text-center">
            <p className="text-[#7DF9FF] text-sm font-poppins">Total Balance</p>
            <p className="text-[#00FFFF] text-3xl font-bold mt-2">
              {tokens} HRT
            </p>
            <div className="mt-4 pt-4 border-t border-[#00FFFF]/30">
              <div className="flex justify-between text-sm">
                <span className="text-[#7DF9FF]">
                  Available for Withdrawal:
                </span>
                <span className="text-[#00FFFF] font-bold">{tokens} HRT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {!walletConnected ? (
            <button
              onClick={() => setShowWalletOptions(true)}
              className="w-full bg-[#00FFFF] text-black py-3 rounded-lg font-bold font-poppins"
            >
              Connect Wallet
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() =>
                  alert(
                    "Coming soon! Withdrawals will be available in the next update."
                  )
                }
                className="w-full bg-[#00FFFF] text-black py-3 rounded-lg font-bold font-poppins hover:bg-[#7DF9FF] transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <i className="fas fa-arrow-right"></i>
                  <span>Withdraw Tokens</span>
                </div>
              </button>
              <p className="text-[#7DF9FF] text-xs text-center font-poppins">
                Minimum withdrawal: 100 HRT
              </p>
            </div>
          )}
          <button className="w-full bg-[#1E1E1E] text-[#00FFFF] py-3 rounded-lg font-bold border border-[#00FFFF] font-poppins">
            Transaction History
          </button>
        </div>

        {showWalletOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1E1E1E] p-6 rounded-xl w-full max-w-md border border-[#00FFFF]">
              <h3 className="text-[#00FFFF] text-xl font-bold mb-4 text-center">
                Select Wallet
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => connectWallet("ton")}
                  className="w-full bg-[#2a2a2a] text-[#00FFFF] py-3 rounded-lg font-bold hover:bg-[#3a3a3a] transition-colors"
                >
                  TON Wallet
                </button>
                <button
                  onClick={() => connectWallet("okx")}
                  className="w-full bg-[#2a2a2a] text-[#00FFFF] py-3 rounded-lg font-bold hover:bg-[#3a3a3a] transition-colors"
                >
                  OKX Wallet
                </button>
                <button
                  onClick={() => connectWallet("binance")}
                  className="w-full bg-[#2a2a2a] text-[#00FFFF] py-3 rounded-lg font-bold hover:bg-[#3a3a3a] transition-colors"
                >
                  Binance Wallet
                </button>
                <button
                  onClick={() => connectWallet("metamask")}
                  className="w-full bg-[#2a2a2a] text-[#00FFFF] py-3 rounded-lg font-bold hover:bg-[#3a3a3a] transition-colors"
                >
                  MetaMask
                </button>
              </div>
              <button
                onClick={() => setShowWalletOptions(false)}
                className="w-full mt-4 bg-transparent text-[#00FFFF] py-2 rounded-lg font-bold border border-[#00FFFF]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {currentPage === "welcome" ? (
        <WelcomePage />
      ) : (
        <div className="min-h-screen bg-black relative">
          <div className="absolute inset-0 bg-[url('https://ucarecdn.com/dd4d32c1-3107-456d-abbe-c1517dfc76e1/-/format/auto/')] bg-cover bg-center opacity-75"></div>
          <div className="relative z-10">
            {currentPage === "mining" && <MiningPage />}
            {currentPage === "tasks" && <TasksPage />}
            {currentPage === "referral" && <ReferralPage />}
            {currentPage === "wallet" && <WalletPage />}
            <Navigation />
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .glow {
          text-shadow: 0 0 10px #00FFFF, 0 0 20px #00FFFF;
        }
        .digital-button {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        }
        .digital-button:hover {
          box-shadow: 0 0 25px rgba(0, 255, 255, 0.7);
        }
      `}</style>
    </>
  );
}

export default MainComponent;