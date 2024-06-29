import * as yup from 'yup';
import {getCurrentDate} from './functions';

const DEFAULT_REQUIRED_MESSAGE = 'Este campo es requerido!';

export const ProductSchema = yup.object().shape({
  id: yup
    .string()
    .required(DEFAULT_REQUIRED_MESSAGE)
    .min(3, 'Debe tener al menos 3 caracteres')
    .max(10, 'Máximo 10 caracteres'),
  name: yup
    .string()
    .required(DEFAULT_REQUIRED_MESSAGE)
    .min(6, 'Debe tener al menos 6 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  description: yup
    .string()
    .required(DEFAULT_REQUIRED_MESSAGE)
    .min(10, 'Debe tener al menos 10 caracteres')
    .max(200, 'Máximo 200 caracteres'),
  logo: yup.string().required(DEFAULT_REQUIRED_MESSAGE),
  date_release: yup
    .date()
    .required(DEFAULT_REQUIRED_MESSAGE)
    .min(
      getCurrentDate(),
      'Fecha de liberación debe ser hoy o una fecha futura',
    ),
  date_revision: yup.date().required(DEFAULT_REQUIRED_MESSAGE),
});

export type ProductSchemaType = yup.InferType<typeof ProductSchema>;
