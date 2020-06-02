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

const Table = ({ posts, token, fetchPosts }) => {
  console.log(fetchPosts)
  const { addToast } = useToasts();

  console.log(token);
  async function onDelete (id) {
    console.log("fsd f ", id);
    const response = await deletePost(id, token);
    console.log(response)
    if (!response.success) {
      addToast(response.message, { appearance: "error" });
    } else {
      addToast("Deleted post.", { appearance: "success" });
      fetchPosts()
    }
  };

  const data = React.useMemo(() => posts, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        sortType: "basic",
      },
      {
        Header: () => <center>Date</center>,
        accessor: "date",
        sortType: "basic",
        Cell: (data) => {
          const date = data.row.original.date;
          return <center>{date}</center>;
        },
      },
      {
        Header: () => <center>Category</center>,
        accessor: "category",
        sortType: "basic",
        Cell: (data) => {
          const category = data.row.original.category;
          return <center>{category}</center>;
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
                <a>edit</a>
              </Link>{" "}
              |{" "}
              <Link href="#">
                <a onClick={() => onDelete(id)}>delete </a>
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
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
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
          Previous Page
        </button>
        {"  "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next Page
        </button>
        <div>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
      </div>
    </>
  );
};

export default Table;
