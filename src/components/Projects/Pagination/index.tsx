import styles from "./index.module.scss";
import Link from "next/link";
import { classes } from "@/utilities/classes";

export type ResponseMeta = {
  docs: Array<any>
  totalDocs: number,
  limit: number,
  totalPages: number,
  page: number,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage: number | null,
  nextPage: number | null,
}

const Pagination: React.FC<{ page: ResponseMeta; baseURL?: string; }> = ({ page: { totalPages, page, hasNextPage, nextPage, hasPrevPage, prevPage }, baseURL = "/gallery" }) => {
  if (totalPages === 1) return null;

  return (
    <nav className={styles["pagination"]}>
      <div className="container">
        <div className={styles["pagination-container"]}>
          <Link
            href={`${baseURL}/page/${prevPage}`}
            aria-disabled={hasPrevPage}
            className={classes(
              styles["pagination-arrows"],
              hasPrevPage ? "" : styles["disabled"],
            )}
          >Prev</Link>
          {page > 1 && (
            <>
              <Link href={baseURL}>1</Link>
              {page > 2 && (
                <Link href={`${baseURL}/page/2`} className={styles["hide-on-sm"]}>
                  2
                </Link>
              )}
              {page > 3 && (
                <Link href={`${baseURL}/page/3`} className={styles["hide-on-sm"]}>
                  3
                </Link>
              )}
              <span></span>
            </>
          )}
          <Link
            href={`${baseURL}/page/${page}`}
            aria-disabled={true}
            className={styles["active"]}
          >
            {page.toString()}
          </Link>
          {(totalPages > 1 && page !== totalPages) && (
            <>
              <span></span>
              {totalPages - 2 > 1 && page < totalPages - 2 && (
                <Link
                  href={`${baseURL}/page/${totalPages - 2}`}
                  className={styles["hide-on-sm"]}
                >
                  {(totalPages - 2).toString()}
                </Link>
              )}
              {totalPages - 1 > 1 && page < totalPages - 1 && (
                <Link
                  href={`${baseURL}/page/${totalPages - 1}`}
                  className={styles["hide-on-sm"]}
                >
                  {(totalPages - 1).toString()}
                </Link>
              )}
              <Link href={`${baseURL}/page/${totalPages}`}>
                {totalPages.toString()}
              </Link>
            </>
          )}
          <Link
            href={`${baseURL}/page/${nextPage}`}
            aria-disabled={hasNextPage}
            className={classes(
              styles["pagination-arrows"],
              hasNextPage ? "" : styles["disabled"]
            )}
          >
            Next
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Pagination;
