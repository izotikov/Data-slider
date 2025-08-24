export type SliderDataElementsType = {
  header: string;
  description: string;
}

export type SliderState = {
  label: string;
  currentSliderData: SliderDataElementsType[];
  currentSliderDataPosition: number;
  allPeriodsIndex: number;
}

export type SliderData = {
  label: string;
  dataArray: SliderDataElementsType[];
}