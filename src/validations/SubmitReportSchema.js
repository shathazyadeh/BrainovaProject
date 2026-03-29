import * as yup from "yup";

export const SubmitReportSchema = (data = []) => {
  const preliminaryId = data.find(
    (q) => q.code === "preliminary assesment"
  )?.id;

  return yup.object().shape(
    data.reduce((acc, q) => {
     
      let fieldSchema = q.isRequired
        ? yup.string().required("This field is required")
        : yup.string().notRequired();

      if (q.id !== preliminaryId) {
        fieldSchema = fieldSchema.when(preliminaryId, {
          is: "no tumor",
          then: () => yup.string().notRequired(),
        });
      }

      acc[q.id] = fieldSchema;
      return acc;
    }, {})
  );
};