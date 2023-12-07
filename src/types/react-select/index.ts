import { ActionMeta, OnChangeValue, SingleValue } from "react-select";
import { ICreatedAtAndStatus } from "../filters";
import { IStatus } from "../status";

export type WithValue<T> = T & { value: string };

export type ReactSelectChangeEventType = (
  newValue: SingleValue<IStatus | ICreatedAtAndStatus>,
  actionMeta: ActionMeta<IStatus | ICreatedAtAndStatus>
) => void;
