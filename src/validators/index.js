import * as Yup from 'yup';

export const validateMessage = Yup.object().shape({
  body: Yup.string()
    .trim()
    .required('Required'),
});

export const validateChannel = (channelsName) => {
  const validator = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Required')
      .min(3, 'Must be 3 to 20 characters')
      .max(20, 'Must be 3 to 20 characters')
      .notOneOf(channelsName, 'Must be unique'),
  });
  return validator;
};
