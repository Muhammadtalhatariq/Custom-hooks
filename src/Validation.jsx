import * as Yup from 'yup';

export const validation = Yup.object({
  title: Yup.string()
    .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'Only one space allow between words')
    .required('Please enter your post title'),
  body: Yup.string()
  .matches(/^[A-Za-z]+( [A-Za-z]+)*$/, 'Only one space allow between words')
    .required('Please enter your post body'),
 
})