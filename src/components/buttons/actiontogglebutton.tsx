import React, { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { useAppDispatch } from 'hooks';

interface DispacherType {
  // eslint-disable-next-line
  (action: string, b: boolean): boolean;
}

export interface ActionToggleButtonType {
  text: string;
  checked: boolean;
  actionType: string;
  action: DispacherType;
}

export default function ActionToggleButton({ text, checked, action, actionType }: ActionToggleButtonType) {
  const [isChecked = true, setisChecked] = useState(checked);
  const dispatch = useAppDispatch();

  return (
    <ToggleButton
      style={{ margin: 1 }}
      size="sm"
      key={'ActionToggleButton' + text}
      id={`ActionToggleButton-` + text}
      type="checkbox"
      variant={isChecked ? 'outline-primary' : 'light'}
      name="radio"
      value={text}
      checked={isChecked}
      onClick={() => {
        dispatch(action(actionType, !isChecked));
        setisChecked(!isChecked);
      }}
    >
      {text}
    </ToggleButton>
  );
}
