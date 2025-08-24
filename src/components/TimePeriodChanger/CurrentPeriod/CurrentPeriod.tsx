import React, {FC} from 'react';
import './CurrentPeriod.scss';

// В идеале для currentSliderDataPosition и в принципе хранения информации о периодах использовать стейт менеджер,
// но, чтобы не усложнять тестовое, используется prop-drilling (плохая практика)
interface CurrentPeriodProps {
  currentSliderDataPosition: number;
  allPeriodsIndex: number;
}

const CurrentPeriod: FC<CurrentPeriodProps> = ({currentSliderDataPosition, allPeriodsIndex}) => {
  return (
    <div className="current-period">
      0{currentSliderDataPosition}/0{allPeriodsIndex}
    </div>
  );
};

export default CurrentPeriod;