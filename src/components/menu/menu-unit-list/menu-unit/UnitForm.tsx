import React from "react";
import { useStore } from "../../../../hooks/storehook";
import { PlannerUnit } from "../../../../types/PlannerUnit";
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonInput,
  IonItem,
} from "@ionic/react";
import "./UnitForm.css";
import { Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";

/**
 * The form for making a new unit.
 */
export const UnitForm: React.FC<{ index: number }> = ({ index }) => {
  const [_, setselectedUnit] = useStore<PlannerUnit | null>(
    "selectedUnit",
    null
  );
  const [units, setUnits] = useStore<PlannerUnit[]>("units", []);

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLIonCardElement>,
    snapshot: DraggableStateSnapshot
  ) => {
    // already used
    if (event.defaultPrevented) {
      return;
    }

    if (snapshot.isDragging) {
      return;
    }

    if (event.code !== "Enter") {
      return;
    }

    // we are using the event for selection
    event.preventDefault();

    performAction(event);
  };

  const onClick = (event: React.MouseEvent<HTMLIonCardElement, MouseEvent>) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    // marking the event as used
    event.preventDefault();

    performAction(event);
  };

  const performAction = (
    event:
      | React.MouseEvent<HTMLIonCardElement, MouseEvent>
      | React.KeyboardEvent<HTMLIonCardElement>
  ) => {
    const hasTitleAndDuration =
      (document.getElementById("form-title") as HTMLInputElement | null)
        ?.value &&
      (document.getElementById("form-duration") as HTMLInputElement | null)
        ?.value;
    if (hasTitleAndDuration) {
      const newUnit: PlannerUnit = {
        id: (document.getElementById("form-title") as HTMLInputElement).value,
        title: (document.getElementById("form-title") as HTMLInputElement)
          .value,
        description: (
          document.getElementById("form-description") as HTMLInputElement
        ).value,
        duration: parseInt(
          (document.getElementById("form-duration") as HTMLInputElement).value
        ),
      };
      setUnits([...units, newUnit]);
      setselectedUnit(newUnit);
    }
  };

  return (
    <Draggable draggableId="unit-form" index={index}>
      {(provided, snapshot) => (
        <IonCard
          id="unit-form"
          className="ion-padding"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onKeyDown={(event) => onKeyDown(event, snapshot)}
          onClick={onClick}
          ref={provided.innerRef}
        >
          <IonCardHeader className="ion-text-center">
            Add a new unit
          </IonCardHeader>
          <IonItem>
            <form
              onSubmit={(event) => event.preventDefault()}
              id="unit-form"
              className="unit-form"
            >
              <IonInput placeholder="Title" id="form-title"></IonInput>
              <IonInput
                placeholder="Description"
                id="form-description"
              ></IonInput>
              <IonInput
                type="number"
                placeholder="Duration"
                id="form-duration"
              ></IonInput>
            </form>
          </IonItem>
        </IonCard>
      )}
    </Draggable>
  );
};
