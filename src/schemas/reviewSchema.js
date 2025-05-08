import * as Yup from "yup";

 // Define validation schema using Yup
 const reviewSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(100, "Title cannot exceed 100 characters"),
    reviewDes: Yup.string()
      .max(1000, "Review description cannot exceed 1000 characters"),
    locationVisited: Yup.string()
      .required("Location is required")
      .max(100, "Location cannot exceed 100 characters"),
    rating: Yup.number()
      .required("Rating is required"),
    duration: Yup.number()
      .required("Duration is required")
      .positive("Duration must be positive")
      .integer("Duration must be a whole number"),
    startDate: Yup.date()
      .nullable(),
    endDate: Yup.date()
      .nullable()
      .test(
        'is-after-start-date', 
        'End date must be after start date', 
        function(value) {
          const { startDate } = this.parent;
          if (startDate && value) {
            return new Date(value) > new Date(startDate);
          }
          return true;
        }
      )
  });

  export default reviewSchema