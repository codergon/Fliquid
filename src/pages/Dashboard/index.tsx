import NFTS from "../../components/NFTs";
import Assets from "../../components/Assets";
import { useAppSelector } from "../../store/reduxHooks";
import Transactions from "../../components/Transactions";

const Dashboard = () => {
  const { activeTab } = useAppSelector((state) => state.main);

  return (
    <div className="dashboard app-container__main base-animation--fade-left">
      {activeTab === "Transactions" ? (
        <Transactions />
      ) : activeTab === "Assets" ? (
        <Assets />
      ) : activeTab === "NFTs" ? (
        <NFTS />
      ) : (
        <Transactions />
      )}
    </div>
  );
};

export default Dashboard;
