import React from "react";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import HelpSupport from "./HelpSupport";

const TabContent = ({ activeTab }) => {
  const tabContent = {
    tab1: <ProfileForm />,
    tab2: <PasswordForm />,
    tab3: <HelpSupport />,
    tab4: <></>,
  };

  return <div>{tabContent[activeTab]}</div>;
};

export default TabContent;
