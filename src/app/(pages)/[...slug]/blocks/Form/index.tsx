import { default as EmbeddedForm } from "@/components/Form";
import { Form, Page } from "@/types/payload-types";

const Form: React.FC<{ section: { form: Form }; breadcrumbs?: Page["breadcrumbs"]; priority: boolean }> = ({
  section: {
    form: { id },
  },
}) => {
  if (id)
    return (
      <section className="section">
        <div className="container" data-aos="fade-up">
          <EmbeddedForm formId={id} />
        </div>
      </section>
    );

  return null;
};

export default Form;
