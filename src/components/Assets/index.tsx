import Asset from "../common/Asset";
import { useAppSelector } from "../../store/reduxHooks";
import EmptyState from "../common/EmptyState";
import millify from "millify";
import Icon from "../common/Icon";

const Assets = () => {
  const { ethAssets } = useAppSelector((state) => state.main);

  return (
    <div className="assets-container base-animation--fade-left">
      <div className="assets-container__header">
        <div className="assets-container__header__item">
          <p className="item_title">Combined Assets:</p>
          <p>&nbsp;{ethAssets.length ? ethAssets.length : "-"}</p>
        </div>
      </div>

      <div className="asset-list">
        {!ethAssets || ethAssets.length === 0 ? (
          <EmptyState />
        ) : (
          ethAssets?.map((asset, index) => (
            <div className="asset-list__item__cover" key={index}>
              <div className="asset-list__item">
                <div className="asset_icon">
                  {!asset?.logo ? (
                    <img src={asset?.logo} alt="" />
                  ) : (
                    <i className="ph-coin" />
                  )}
                </div>

                <div className="details">
                  <div className="name_amount">
                    <p className="value">{asset?.name}</p>
                    <p className="value">{asset?.symbol}</p>
                  </div>
                  <div className="info">
                    {millify(Number(asset?.balance) / 1e18, {
                      precision: 3,
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assets;
