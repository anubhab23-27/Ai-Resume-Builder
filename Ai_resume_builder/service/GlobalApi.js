import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiousClint = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const CreateNewResume = (data) => axiousClint.post("/user-resumes", data);
const GetUserResumes = (userEmail) =>
  axiousClint.get(
    `/user-resumes?filters[userEmail][$eq]=${encodeURIComponent(userEmail)}`,
  );

const UpdateResumeDetail = (id, data) =>
  axiousClint.put('/user-resumes/' + id, data);

const GetResumeById = (id) =>
  axiousClint.get("/user-resumes/" + id + "?populate=*");

const DeleteResumeById = (id) => axiousClint.delete("/user-resumes/" + id);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
};
