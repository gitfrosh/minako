import { useForm, useField } from "react-form";
import Editor from "./Editor";
import DatePicker from "react-datepicker";
import moment from "moment";
import { editPost, postPost } from "../helpers/api";

function todayToMongoISO() {
  return moment(new Date()).format("YYYY-MM-DD[T00:00:00.000Z]");
}

async function sendToServer(values,{
  isEditor, id
} ) {
  console.log("isEd ", isEditor);
  console.log("id ", id);

  let formattedDate = moment(values.date).format("YYYY-MM-DD");
  values.date = formattedDate;
  values.updatedAt = todayToMongoISO();
  console.log("date ", values.date);
  console.log("creAt ", values.createdAt);
  console.log("updAt ", values.updatedAt);

  if (!isEditor) {
    postPost(values);
  }
  if (isEditor) {
    editPost(id, values);
  }
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

function DateField({ date }) {
  const {
    value = [],
    setValue,
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("date", {
    defaultValue: date,
    //   validate: validateAddressStreet
  });

  const handleChange = (date) => {
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

function CreatedAtField({ createdAt }) {
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("createdAt", {
    defaultValue: createdAt,
    //   validate: validateAddressStreet
  });

  return (
    <>
      <input
        style={{ display: "none" }}
        type="hidden"
        type="text"
        {...getInputProps()}
      />
    </>
  );
}

function TextField({ html }) {
  const {
    setValue,

    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField("html", {
    defaultValue: html,

    //   validate: validateAddressStreet
  });

  const handleChange = (text) => {
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
  const {
    Form,
    meta: { isSubmitting, canSubmit },
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      await sendToServer(values, { isEditor: !!post, id: post && post.id || null});
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
          Date: <DateField date={(post && new Date(post.date)) || new Date()} />
        </label>
      </div>
      <div>
        <label>
          Text: <TextField html={(post && post.html) || ""} />
        </label>
      </div>

      <CreatedAtField
        createdAt={(post && post.createdAt) || todayToMongoISO()}
      />

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
