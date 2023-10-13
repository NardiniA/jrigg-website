import Link from "next/link";

type PageNotFoundProps = {
  pretitle?: string;
  title?: string;
  desc: string;
  btnText?: string;
  btnHref?: string;
  children?: React.ReactNode;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({
  pretitle = "Oops!",
  title = "Page Not Found",
  desc,
  btnText = "Return Home",
  btnHref = "/",
  children,
}) => {
  return (
    <section className="error-container">
      <div className="row">
        <div className="column-three-quarters">
          <div className="error-content">
            <h1>{pretitle}</h1>
            <h2>{title}</h2>
            <p>{desc}</p>

            {!!children ? children : (
              <Link href={btnHref} className="error-btn">
                <span className="error-btn-icon"></span>
                <span className="error-btn-text">{btnText}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
