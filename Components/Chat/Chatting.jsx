import React from "react";

//INTERNAL IMPORT
import { SideBar, Chat, Help, History, Subscription, Sitting } from "./index";

const Chatting = () => {
  return (
    <section className="chatting-wrapper pt-0">
      <SideBar />
      <div className="tab-content">
        <Chat />
        <History />
        <Subscription />
        <Help />
        <Sitting />
      </div>
    </section>
  );
};

export default Chatting;
