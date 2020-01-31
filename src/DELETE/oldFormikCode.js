
 <h1>Create Api Form</h1>
        <Formik 
          initialValues={{ email: '', password: '', apiName:'', apiDescription:'' }}
          validate={values => {
            const errors = {};
            if (!values.apiName) {
              errors.apiName = 'Api Name Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.apiName)
            ) {
              errors.apiName = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form  onSubmit={handleSubmit}>
            <div><TextField name="apiName" onChange={handleChange} onBlur={handleBlur}
                value={values.apiName} id="outlined-basic" label="Api Name" variant="outlined" /></div>
            {errors.apiName && touched.apiName && errors.apiName}

            <div>
              <TextField name="apiDescription" onChange={handleChange} onBlur={handleBlur}
                value={values.apiDescription} id="outlined-basic" label="api Description" variant="outlined" />
              
            </div>
            {errors.apiDescription && touched.apiDescription && errors.apiDescription}


              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <Button variant="outlined" color="primary" type="submit" disabled={isSubmitting} variant="contained" color="primary">
        Primary
      </Button>
              
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>