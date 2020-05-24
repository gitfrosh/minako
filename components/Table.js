import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination,
} from "react-table";
import Link from "next/link";

const Table = ({ posts }) => {
  const onDelete = (id) => {
    console.log("fsd f ", id);
  };

  const data = React.useMemo(() => posts, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "title",
        sortType: "basic",
      },
      {
        Header: "Column 2",
        accessor: "date",
        sortType: "basic",
      },
      {
        Header: "Column 2",
        accessor: "category",
        sortType: "basic",
      },
      {
        id: "actions",

        Header: "",
        Cell: (data) => {
          const id = data.row.original.id;
          return  <div>
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
        </div>
        }
         
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
