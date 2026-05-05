import * as yup from "yup";

export const SubmitReportSchema = (questions, isNoTumor) => {
  // object رح نخزن فيه الـ validation rules لكل سؤال حسب id تبعه
  const shape = {};

  // نمشي على كل سؤال جاي من الباك
  questions.forEach((q) => {
    // البداية: نفترض أن الإجابة نص (string)
    let validator = yup.string();

    // إذا السؤال مطلوب (required من الباك)
    if (q.isRequired) {
      // نخليه إجباري ويعطي رسالة خطأ إذا فاضي
      validator = validator.required("This field is required");
    }

    // إذا السؤال مربوط بحالة "no tumor"
    // ومعناه: إذا الحالة فعلاً No Tumor → تجاهل التحقق لهذا السؤال
    if (q.skipWhenNoTumor && isNoTumor) {
      validator = validator.notRequired();
    }

    // نخزن الـ validator حسب id السؤال
    shape[q.id] = validator;
  });

  // نحول الشكل النهائي إلى yup schema جاهز للاستخدام في react-hook-form
  return yup.object().shape(shape);
};