export const academicDepartments = {
  "Arts and Humanities": [
    "English Literature",
    "History",
    "Philosophy",
    "Linguistics",
    "Visual Arts",
  ],
  "Social Sciences": [
    "Sociology",
    "Psychology",
    "Political Science",
    "Anthropology",
    "International Relations",
  ],
  "Engineering and Technology": [
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Chemical Engineering",
  ],
  Medicine: [
    "Anatomy",
    "Pharmacology",
    "Pathology",
    "Surgery",
    "Public Health",
  ],
  "Business Studies": [
    "Accounting",
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Operations Management",
  ],
  Education: [
    "Curriculum Development",
    "Educational Psychology",
    "Special Education",
    "Early Childhood Education",
    "Instructional Design",
  ],
  "Environmental Studies": [
    "Environmental Science",
    "Ecology",
    "Climate Studies",
    "Sustainability Management",
    "Forestry",
  ],
  Law: [
    "Corporate Law",
    "Criminal Law",
    "International Law",
    "Human Rights Law",
    "Intellectual Property Law",
  ],
  "Computer Science": [
    "Software Engineering",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Human-Computer Interaction",
  ],
  Science: ["Physics", "Chemistry", "Biology", "Mathematics", "Geology"],
};
export type Faculty = keyof typeof academicDepartments;
export const facultyNames = Object.keys(academicDepartments);

const getDepartmentsByFaculty = (faculty: Faculty): string[] =>
  academicDepartments[faculty] || [];

export const academicDepartmentOptions = (faculty: Faculty) =>
  getDepartmentsByFaculty(faculty).map((item) => ({
    value: item,
    label: item,
  }));

// export const academicDepartmentOptions = (faculty: string) => {
//   if (faculty in academicDepartments) {
//     return academicDepartments[faculty].map((item: any) => ({
//       value: item,
//       label: item,
//     }));
//   }
//   return [];
// };
