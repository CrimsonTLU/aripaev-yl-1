import { Autocomplete, TextField, Box, Button } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";

export interface QueryOption {
  value: string;
  label: string;
}

export interface QueryFormOptions {
  tegevusalaOptions: QueryOption[];
}

export interface QueryValues {
  tegevusala: string;
}

export interface QueryFormProps {
  options: QueryFormOptions;
  onSubmit: (values: QueryValues) => void;
}

const QueryForm: FC<QueryFormProps> = ({ options, onSubmit }) => {
  const formik = useFormik<QueryValues>({
    initialValues: { tegevusala: "" },
    onSubmit,
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mb: 4 }}>
      <Autocomplete
        options={options.tegevusalaOptions}
        getOptionLabel={(option) => option.label}
        onChange={(_, val) =>
          formik.setFieldValue("tegevusala", val?.value || "")
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tegevusala"
            margin="normal"
            fullWidth
            required
          />
        )}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Näita palgatrendi
      </Button>
    </Box>
  );
};

export default QueryForm;
