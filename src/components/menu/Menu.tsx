import React from "react";
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";import { MenuUnitList } from "./menu-unit-list/MenuUnitList";

/**
 * A component that handles the menu view.
 */
export const Menu: React.FC = () => (
  <IonMenu contentId="unit-content" type="overlay" side="start">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Planner Units</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
        <MenuUnitList />
    </IonContent>
  </IonMenu>
);
