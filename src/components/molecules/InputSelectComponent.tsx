import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';

interface Props {
    selectTit: string;
    List: IList[];
    onChange?: (v: string) => void
}
interface IList {
    name: string;
}
export const InputSelect: React.FC<Props> = ({selectTit, List, onChange}) => {
    return (
        <IonItem>
            <IonLabel>{selectTit && selectTit}</IonLabel>
            <IonSelect 
                placeholder="Select One" 
                onIonChange={(e) => onChange && onChange(e.detail.value!)}
            >
                {List.map((a, i) => {
                    return (
                    <IonSelectOption key={i} value={a.name}>{a.name}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
  )
}