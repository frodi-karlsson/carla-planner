import React, { useState } from "react";
import { useStore } from "../../../hooks/storehook";
import { MenuUnit } from "./menu-unit/MenuUnit";
import { PlannerUnit } from "../../../types/PlannerUnit";
import { IonContent, IonItem, IonList } from "@ionic/react";
import { UnitForm } from "./menu-unit/UnitForm";
import { DragDropContext, DragDropContextProps, Droppable, DroppableProps, OnDragEndResponder } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../../dnd/StrictModeDroppable";

/**
 * A component that handles the user's list of units in the menu view.
 */
export const MenuUnitList: React.FC = (props) => {
  const [units] = useStore<PlannerUnit[]>("units", []);
  const [index, setIndex] = useState<number>(0);

  function getNewIndex() {
    return index + 1;
  }

  function reorder(list: PlannerUnit[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    // if (result.length === 0) {
    //   result.push(removed);
    // }

    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd: OnDragEndResponder = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      units,
      result.source.index,
      result.destination.index
    );

    setIndex(result.destination.index);
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <StrictModeDroppable
        droppableId="unit-form-list"
        direction="vertical"
        type="unit"
        ignoreContainerClipping={true}
        isCombineEnabled={false}
        isDropDisabled={true}
      >
        {(provided) => (
          <IonList
            id="unit-form-list"
            className="ion-justify-self-start"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
              {provided.placeholder}
              <IonItem key="unit-form">
                <UnitForm index={getNewIndex()} />
              </IonItem>
          </IonList>
        )}
      </StrictModeDroppable>
      <StrictModeDroppable
        droppableId="unit-list"
        direction="vertical"
        type="unit"
        ignoreContainerClipping={true}
        isCombineEnabled={false}
        isDropDisabled={true}
      >
        {(provided) => (
          <IonList
            id="unit-list"
            className="ion-justify-self-start"
            {...provided.droppableProps}
            ref={provided.innerRef}

            >
              {provided.placeholder}
              <IonItem key="unit-form">
              </IonItem>
              {units.map((unit) => (
                  <IonItem key={unit.id}>
                    <MenuUnit unit={unit} key={unit.id} index={getNewIndex()} />
                  </IonItem>
              ))}
          </IonList>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
