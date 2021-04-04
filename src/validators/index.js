import * as Yup from 'yup';

export const validateMessage = Yup.object().shape({
  body: Yup.string()
    .required('Required'),
});

export const validateChannel = (channelsName) => {
  const validator = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Must be 3 to 20 characters')
      .max(20, 'Must be 3 to 20 characters')
      .required('Required')
      .notOneOf(channelsName, 'Must be unique'),
  });
  return validator;
};
