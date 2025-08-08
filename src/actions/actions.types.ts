export type ActionResult<ErrorFields extends Record<string, string[]>> = {
  success: boolean;
  errors?: ErrorFields;
};
