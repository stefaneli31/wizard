export const MAX_STEPS = 4;

export const getPreviousStepIndex = state => {
  if (state.currentStep === 1) {
    return 1;
  }
  if (
    state.wizard.step2.subgenre && // chosen subgenre does not need to created
    state.currentStep === MAX_STEPS
  ) {
    return 2;
  }
  return state.currentStep - 1;
}

export const getNextStepIndex = state => {
  if (state.currentStep === MAX_STEPS) {
    return MAX_STEPS;
  }
  if (
    state.wizard.step2.subgenre && // chosen subgenre does not need to created
    state.currentStep === 2
  ) {
    return 4;
  }
  return state.currentStep + 1;
}

export const fakeFetch = (
  payload = null,
  shouldResolve = true,
  time = 700
) => {
  console.log(`FAKING NETWORK REQUEST FOR ${time}ms`);
  console.log('Should fetch resolve: ', shouldResolve);
  return new Promise((resolve, reject) => {
    const complete = shouldResolve ? resolve : reject;
    setTimeout(complete, time);
  });
}