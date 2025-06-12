import Joi from 'joi';

const allowedQuestions: string[] = [
  'merasa_gugup_cemas_atau_gelisah',
  'tidak_dapat_menghentikan_kekhawatiran',
  'banyak_mengkhawatirkan_berbagai_hal',
  'sulit_merasa_santai',
  'sangat_gelisah_sehingga_sulit_untuk_diam',
  'mudah_tersinggung_dan_mudah_marah',
  'merasa_takut_seolah_olah_sesuatu_buruk_akan_terjadi',
];

const allowedAnswers: string[] = [
  'Tidak Pernah',
  'Beberapa Hari',
  'Lebih dari Separuh Waktu yang ditentukan',
  'Hampir Setiap Hari',
];

export const testValidator = Joi.object({
  values: Joi.array()
    .items(
      Joi.object({
        question: Joi.string()
          .valid(...allowedQuestions)
          .required(),
        answer: Joi.string()
          .valid(...allowedAnswers)
          .required(),
      }).label('Answer Schema'),
    )
    .length(allowedQuestions.length)
    .unique('question')
    .required()
    .label('answers'),
}).label('Test Schema');
