import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';

interface Props {
    List: IList[];
}
interface IList {
    name: string;
}
export const InputSelect: React.FC<Props> = ({List}) => {
    const [name, setName] = useState<string>();

    return (
        <IonItem>
            <IonLabel>마을씨 이름</IonLabel>
            <IonSelect value={name} placeholder="Select One" onIonChange={e => setName(e.detail.value)}>
                {List.map((a, i) => {
                    return (
                    <IonSelectOption key={i} value={a.name}>{a.name}</IonSelectOption>
                    )
                })}
            </IonSelect>
        </IonItem>
  )
}