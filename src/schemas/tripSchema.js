import * as Yup from "yup";

const TripSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Trip title is required")
    .min(3, "Title must be at least 3 characters long")
    .max(25, "Title cannot exceed 15 characters"),
  
  description: Yup.string().trim().max(500, "Description cannot exceed 500 characters"),

  destination: Yup.string()
    .trim()
    .required("Destination is required")
    .min(2, "Destination name must be at least 2 characters long"),

  duration: Yup.number()
    .typeError("Duration must be a number") // Ensures it’s a number
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .integer("Duration must be a whole number"),

  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),

  endDate: Yup.date()
    .nullable() // Allows optional end date
    .min(Yup.ref("startDate"), "End date cannot be before start date"),

  group: Yup.string()
    .required("Group type is required")
    .oneOf(["Solo", "Duo", "Trio", "Friends", "Family"], "Invalid group type"),
});

export default TripSchema;
