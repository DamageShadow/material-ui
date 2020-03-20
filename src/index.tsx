import * as React from 'react';
import {render} from 'react-dom';
import {Formik, Form, Field} from 'formik';
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch,
} from 'formik-material-ui';
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface Values {
  email: string;
}

const ranges = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

function UpperCasingTextField(props: TextFieldProps) {
  const {
    form: {setFieldValue},
    field: {name},
  } = props;
  const onChange = React.useCallback(
    event => {
      const {value} = event.target;
      setFieldValue(name, value ? value.toUpperCase() : '');
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

const App = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      select: 'none',
      tags: [],
      rememberMe: true,
      date: new Date(),
      time: new Date(),
      dateTime: new Date(),
    }}
    validate={values => {
      const errors: Partial<Values> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      return errors;
    }}
    onSubmit={(values, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
    render={({submitForm, isSubmitting, values, setFieldValue}) => (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Field
            component={UpperCasingTextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
          />
          <br />
          <FormControlLabel
            control={<Field component={Switch} name="rememberMe" />}
            label="Remember Me"
          />
          <br />
          <Field
            component={TextField}
            type="text"
            name="select"
            label="With Select"
            select
            variant="standard"
            helperText="Please select Range"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          >
            {ranges.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Field>
          <br />
          <FormControl>
            <InputLabel shrink={true} htmlFor="tags">
              Tags
            </InputLabel>
            <Field
              component={Select}
              type="text"
              name="tags"
              multiple={true}
              inputProps={{name: 'tags', id: 'tags'}}
            >
              <MenuItem value="dogs">Dogs</MenuItem>
              <MenuItem value="cats">Cats</MenuItem>
              <MenuItem value="rats">Rats</MenuItem>
              <MenuItem value="snakes">Snakes</MenuItem>
            </Field>
          </FormControl>
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <Field component={TimePicker} name="time" label="Time" />
          <br />
          <Field component={DatePicker} name="date" label="Date" />
          <br />
          <Field component={DateTimePicker} name="dateTime" label="Date Time" />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      </MuiPickersUtilsProvider>
    )}
  />
);

render(<App />, document.getElementById('root'));
