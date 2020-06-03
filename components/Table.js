import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table";
import Link from "next/link";
import { deletePost } from "../helpers/api";
import { useToasts } from "react-toast-notifications";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {faSortUp} from "@fortawesome/free-solid-svg-icons";
import {faSortDown} from "@fortawesome/free-solid-svg-icons";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";
import {faChevronCircleLeft} from "@fortawesome/free-solid-svg-icons";

const Table = ({ posts, token, fetchPosts }) => {
  console.log(fetchPosts);
  const { addToast } = useToasts();

  console.log(token);
  async function onDelete(id) {
    console.log("fsd f ", id);
    const response = await deletePost(id, token);
    console.log(response);
    if (!response.success) {
      addToast(response.message, { appearance: "error" });
    } else {
      addToast("Deleted post.", { appearance: "success" });
      fetchPosts();
    }
  }

  const data = React.useMemo(() => posts, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        sortType: "basic",
        Cell: (data) => {
          const title = data.row.original.title;
          return <div className="table-cell">{title}</div>;
        },
      },
      {
        Header: () => <center>Date</center>,
        accessor: "date",
        sortType: "basic",
        Cell: (data) => {
          const date = data.row.original.date;
          return (
            <center>
              <span className="table-tag">{date}</span>
            </center>
          );
        },
      },
      {
        Header: () => <center>Created At</center>,
        accessor: "createdAt",
        sortType: "basic",
        Cell: (data) => {
          const createdAt = data.row.original.createdAt;
          return (
            <center>
              <span className="table-tag">{createdAt.slice(0, -14)}</span>
            </center>
          );
        },
      },
      {
        Header: () => <center>Category</center>,
        accessor: "category",
        sortType: "basic",
        Cell: (data) => {
          const category = data.row.original.category;
          return (
            <center>
              <span className="table-tag">{category}</span>
            </center>
          );
        },
      },
      {
        id: "actions",
        Header: "",
        Cell: (data) => {
          const id = data.row.original.id;
          return (
            <center>
              <Link
                prefetch={false}
                href={`/post/[post]`}
                as={`/post/${id}`}
                passHref
              >
                <a>
                  <button>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </a>
              </Link>
            </center>
          );
        },
      },
      {
        id: "actions-2",
        Header: "",
        Cell: (data) => {
          const id = data.row.original.id;
          return (
            <center>
              <Link href="#">
                <a onClick={() => onDelete(id)}>
                  <button>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </a>
              </Link>
            </center>
          );
        },
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      data: data,
      columns: columns,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <center>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FontAwesomeIcon icon={faSortDown} />
                        : <FontAwesomeIcon icon={faSortUp} />
                      : ""}
                  </center>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        <FontAwesomeIcon icon={faChevronCircleLeft} />
        </button>
        {"  "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
        <FontAwesomeIcon icon={faChevronCircleRight} />

        </button>
        {/* <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div> */}
      </div>
      <style jsx>{``}</style>
    </>
  );
};

export default Table;
