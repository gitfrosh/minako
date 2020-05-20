import { useForm, useField } from "react-form";
import Editor from "./Editor";
import DatePicker from "react-datepicker";

async function sendToFakeServer(values) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return values;
}

function TitleField({ title }) {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("title", {
    defaultValue: title,
    //   validate: validateAddressStreet
  });

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function DateField({ createdAt }) {
  const {
    value = [],
    setValue,
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("createdAt", {
    defaultValue: createdAt,
    //   validate: validateAddressStreet
  });

  const handleChange = (date) => {
    console.log(date);
    setValue(date);
  };

  return <DatePicker selected={value} onChange={handleChange} />;
}

function SlugField({ slug }) {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("slug", {
    defaultValue: slug,
    //   validate: validateAddressStreet
  });

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function TextField({ html }) {
  console.log(html);
  const {
    setValue,

    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("html", {
    defaultValue: html,

    //   validate: validateAddressStreet
  });

  const handleChange = (text) => {
    console.log(text);
    setValue(text);
  };

  return (
    <>
      <Editor handleChange={handleChange} {...getInputProps()} html={html} />
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function CategoryField({ category }) {
  console.log(category);
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("category", {
    defaultValue: category,

    //   validate: validateAddressStreet
  });

  return (
    <>
      <input type="text" {...getInputProps()} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
}

function Form({ post }) {
  console.log(post);
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToFakeServer(values);
      console.log("Huzzah!");
    },
    debugForm: true,
  });

  return (
    <Form>
      <div>
        <label>
          Title: <TitleField title={(post && post.title) || ""} />
        </label>
      </div>
      <div>
        <label>
          Slug: <SlugField slug={(post && post.slug) || ""} />
        </label>
      </div>
      <div>
        <label>
          Category: <CategoryField category={(post && post.category) || ""} />
        </label>
      </div>
      <div>
        <label>
          Date: <DateField createdAt={(post && new Date(post.createdAt)) || ""} />
        </label>
      </div>
      <div>
        <label>
          Text: <TextField html={(post && post.html) || ""} />
        </label>
      </div>

      <div>
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </div>

      <div>
        <em>{isSubmitting ? "Submitting..." : null}</em>
      </div>
    </Form>
    /* <style jsx>{`
     
      
      `}</style> */
  );
}
export default Form;
