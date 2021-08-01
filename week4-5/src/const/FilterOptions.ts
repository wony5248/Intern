export default {
  filterBy: [
    { value: "", label: "Filter by" },
    { value: "label tag", label: "Label Tag" },
    { value: "class", label: "Label Class" },
    { value: "status", label: "Status" },
    { value: "created date", label: "Created Date" },
    { value: "last updated", label: "Last Updated" },
    { value: "assignee", label: "Assignee" },
    { value: "open issues", label: "Open Issues" },
    { value: "dataset", label: "Dataset" }
  ],
  status: {
    conditions: [{ value: "is any one of", label: "is any one of" }],
    options: [
      { value: "in progress", label: "in progress" },
      { value: "skipped", label: "skipped" },
      { value: "submitted", label: "submitted" }
    ]
  },
  "label tag": {
    conditions: [
      { value: "contains all of", label: "contains all of" },
      { value: "contains any one of", label: "contains any one of" },
      {
        value: "does not contain any one of",
        label: "does not contain any one of"
      },
      { value: "is empty", label: "is empty" },
      { value: "is not empty", label: "is not empty" }
    ],
    subConditions: [
      { value: "all of", label: "all of" },
      { value: "any one of", label: "any one of" }
    ]
  },
  class: {
    conditions: [{ value: "contains all of", label: "contains all of" }]
  },
  date: {
    conditions: [
      { value: "is", label: "is" },
      { value: "is in the range", label: "is in the range" }
    ]
  },
  assignee: {
    conditions: [
      { value: "is any one of", label: "is any one of" },
      { value: "does not exist", label: "does not exist" }
    ]
  },
  "open issues": {
    conditions: [
      { value: "exist", label: "exist" },
      { value: "do not exist", label: "do not exist" }
    ]
  },
  dataset: {
    conditions: [{ value: "is any one of", label: "is any one of" }]
  }
};
