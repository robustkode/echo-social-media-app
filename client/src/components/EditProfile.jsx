import uniqid from "uniqid";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Dropzone from "react-dropzone";

import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { setUser } from "../state";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string(),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string(),
  location: yup.string(),
  occupation: yup.string(),
  picture: yup.string(),
});

const EditProfile = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dark = palette.neutral.dark;

  const token = useSelector((state) => state.token);
  const {
    _id,
    firstName,
    lastName,
    bio,
    picturePath,
    location,
    occupation,
    email,
  } = useSelector((state) => state.user);

  console.log(bio, location, occupation);
  const initialValues = {
    _id,
    firstName,
    lastName,
    bio,
    location,
    occupation,
    email,
    picture: "",
  };

  const updateProfile = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      if (values[value]) {
        formData.append(value, values[value]);
      } else {
        formData.append(value, "");
      }
    }

    if (values.picture) {
      const ext = values.picture.name.split(".").slice(-1)[0];
      const newFileName = uniqid() + "." + ext;
      formData.append("picturePath", newFileName);
    }

    const savedUserResponse = await fetch(
      `http://localhost:3001/users/${_id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    dispatch(setUser({ user: savedUser }));
    navigate("/");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await updateProfile(values, onSubmitProps);
  };

  return (
    <WidgetWrapper>
      <Box display="flex" gap="1rem" alignItems="center">
        <UserImage image={picturePath} />
        <Box>
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {initialValues.firstName} {initialValues.lastName}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ m: "1rem 0 1.5rem 0" }} />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="Email"
                  value={initialValues.email}
                  name="email"
                  disabled
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bio}
                  name="bio"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    label="Profile"
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        textAlign="center"
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography>Add profile</Typography>
                        ) : (
                          <Typography>{values.picture.name}</Typography>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </Box>

              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Edit
                </Button>
              </Box>
            </form>
          </>
        )}
      </Formik>
    </WidgetWrapper>
  );
};

export default EditProfile;
