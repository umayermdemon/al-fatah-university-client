export type TCourses = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCourse[];
  isDeleted: boolean;
};

export type TPreRequisiteCourse = {
  course: TCourses;
  isDeleted: boolean;
  _id: string;
};
