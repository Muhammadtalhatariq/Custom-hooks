import * as Yup from "yup";

const spaceNotAllow = (value) => {
  if (typeof value !== "string") return false;
  return value.trimStart().length === value.length;
};

export const validate = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .test("no-leading-space", "Cannot start with space", spaceNotAllow)
    .min(4, "Title must be at least 4 characters"),
  body: Yup.string()
    .required("Content is required")
    .test("no-leading-space", "Cannot start with space", spaceNotAllow)
    .min(8, "Content must be at least 8 characters"),
});
