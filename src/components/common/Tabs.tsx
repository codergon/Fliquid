import Icon from "./Icon";
import { useEffect, useState } from "react";
import ChainSwitch from "./ChainSwitch";
import { useMoralis } from "react-moralis";
import { setCurrentTab } from "../../store/rootSlice";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";

const Tabs = () => {
  const [searchInp, setSearchInp] = useState("");
  const [searching, setSearching] = useState(false);

  const dispatch = useAppDispatch();
  const { activeTab } = useAppSelector((state) => state.main);

  const {
    user,
    logout,
    authenticate,
    isAuthUndefined,
    isAuthenticated,
    isAuthenticating,
  } = useMoralis();

  const signOut = async () => {
    await logout();
  };

  // useEffect(() => {
  //   signOut();
  // }, []);

  const tabsConfig = [
    {
      name: "Transactions",
      icon: <Icon.TxnsArrows />,
    },
    {
      name: "Assets",
      icon: <Icon.AssetsEth />,
    },
    {
      name: "NFTs",
      icon: <Icon.NftAlien />,
    },
  ];
  return (
    <div className="base-tabs">
      <div className="base-tabs__controls" data-search={searching}>
        {tabsConfig.map((control, index) => (
          <button
            key={index}
            className="base-tabs__controls__btn"
            data-active={control.name === activeTab}
            onClick={() => dispatch(setCurrentTab(control.name))}
          >
            {control.icon}
            <p>{control.name}</p>
          </button>
        ))}
      </div>

      <div className="action-btns" data-search-bar-cover={searching}>
        <button
          className="action-btns__btn search-btn show-tablet"
          onClick={() => setSearching(true)}
          data-search={searching}
        >
          <i className="ph-magnifying-glass" />
        </button>
        <div className="search-input hide-tablet" data-search-bar={searching}>
          <input
            type="text"
            value={searchInp}
            onChange={(e) => setSearchInp(e.target.value)}
            placeholder="Search..."
          />
          <i
            className="ph-x-bold"
            style={{ opacity: !!searchInp.trim() ? 0.4 : 0 }}
          />
        </div>
        {searching ? (
          <button
            className="action-btns__btn search-btn show-tablet"
            onClick={() => setSearching(false)}
          >
            <i className="ph-caret-right"></i>
          </button>
        ) : null}

        <ChainSwitch searching={searching} />
      </div>
    </div>
  );
};

export default Tabs;
