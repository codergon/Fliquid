import { useMoralis } from "react-moralis";
import Icon from "../../components/common/Icon";
import { isMobile } from "react-device-detect";
import Footer from "../../components/layout/Footer";

const Homepage = () => {
  const { authenticate, isAuthenticated, isAuthenticating } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: "Authenticate Fliquid to sign in",
          // type: "sol",

          provider: isMobile ? "walletConnect" : "metamask",
          mobileLinks: ["rainbow", "metamask", "trust"],
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="app_logo">
          <Icon.Logo />
        </div>

        <div className="hero_text">
          <p className="main">
            Manage your portfolio <br className="hide-mb" /> accross multiple
            networks.
          </p>
          <p className="sub">
            Make important financial decisions with stats provided for your
            connected accounts which are updated in realtime.
          </p>

          <div className="connect_wallet" onClick={login}>
            {isAuthenticating ? "Connecting Wallet..." : "Connect Wallet"}
            <Icon.Metamask />
          </div>
        </div>

        <div className="hero_image">
          <img src="img/preview.png" alt="" />
        </div>

        <div className="slug">&nbsp;</div>
      </div>
    </>
  );
};

export default Homepage;
