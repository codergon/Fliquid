import Icon from "./Icon";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const ChainSwitch = ({ searching }: { searching: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState("metamask");

  const ref = useDetectClickOutside({ onTriggered: () => setIsOpen(false) });

  const SetChain = (chain: string) => {
    setCurrent(chain);
    setIsOpen(false);
  };

  return (
    <div className="chain-switch" ref={ref}>
      <button
        className="action-btns__btn"
        onClick={() => setIsOpen((p) => !p)}
        data-search={searching}
      >
        {current === "metamask" ? <Icon.Metamask /> : <Icon.Phantom />}
        <i className="ph-caret-down-bold"></i>
      </button>

      <div className="dropdown" style={{ display: isOpen ? "flex" : "none" }}>
        <button
          data-search={searching}
          className={`action-btns__btn ${
            current === "metamask" ? "active" : ""
          }`}
          onClick={() => SetChain("metamask")}
        >
          <Icon.Metamask />
        </button>

        <button
          data-search={searching}
          className={`action-btns__btn ${
            current === "phantom" ? "active" : ""
          }`}
          onClick={() => SetChain("phantom")}
        >
          <Icon.Phantom />
        </button>
      </div>
    </div>
  );
};

export default ChainSwitch;
