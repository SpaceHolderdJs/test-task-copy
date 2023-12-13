export interface IsearchByStatusAndDate {
  status: string;
  createdAt: string;
}

export interface ICreatedAtAndStatus {
  createdAt: string;
  label: string;
  value: string;
}

export interface IDtoSharedButton {
  text: string;
  onClickFunc: () => void;
}
