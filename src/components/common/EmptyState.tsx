import React from "react";
import Icon from "./Icon";

const EmptyState = () => {
  return (
    <div className="empty_state">
      <Icon.Ghost />
      <p>You have nothing here yet!</p>
    </div>
  );
};

export default EmptyState;
