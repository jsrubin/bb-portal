import React from "react";
import Steps, { Step } from "rc-steps";
import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";

export const ProgressBar = props => {
  const { currentStep = 0, stepTitles } = props;

  const steps = stepTitles.map(title => {
    return <Step title={title} />;
  });

  return <Steps current={currentStep}>{steps}</Steps>;
};
