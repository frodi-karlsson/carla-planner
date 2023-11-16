import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSplitPane,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { Menu } from "../components/menu/Menu";
import { DateTitle } from "../components/date-title/DateTitle";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonSplitPane contentId="unit-content" when="md">
        <Menu />
        <IonContent id="unit-content">
          <IonHeader>
            <IonToolbar>
              <DateTitle />
            </IonToolbar>
          </IonHeader>
          <ExploreContainer />
        </IonContent>
      </IonSplitPane>
    </IonPage>
  );
};

export default Home;
