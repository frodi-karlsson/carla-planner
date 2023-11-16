import React from 'react';
import { PlannerUnit } from '../../../../types/PlannerUnit';
import { IonCard, IonCardHeader, IonItem } from '@ionic/react';
import { Draggable } from 'react-beautiful-dnd';

/**
 * A component that handles Planner Units in the menu view.
 */
export const MenuUnit: React.FC<{ unit: PlannerUnit, index: number }> = ({ unit, index }) => {

    return (
        <Draggable draggableId={unit.id} index={index}>
            {(provided) => (
                <IonCard
                    className="ion-padding"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <IonCardHeader>{unit.title}</IonCardHeader>
                    <IonItem>
                        <p>{unit.description}</p>
                    </IonItem>
                </IonCard>
            )}
        </Draggable>
    );
};
