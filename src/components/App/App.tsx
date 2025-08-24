import React, {FC} from 'react';
import './App.scss';
import AnimatedDataSectionContainer from "@components/AnimatedDataSectionContainer/AnimatedDataSectionContainer";
import ClickCircle from "@components/ClickCircle/ClickCircle";

const App: FC = () => {
  return (
    <div className="app-container">
      <AnimatedDataSectionContainer />
      <ClickCircle/>
    </div>
  );
};

export default App;
