import { useTable, useGlobalFilter, useSortBy, usePagination, useAsyncDebounce } from "react-table";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import "./styles/List.css";

const List = (props) => {
	const { data = [], columns = [], handleView } = props;

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		setGlobalFilter,
		state: { pageSize, globalFilter },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 5 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	return (
		<div className="m-3">
			<GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render("Header")}
									<span>{column.isSorted ? (column.isSortedDesc ? "⇓" : "⇑") : ""}</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row, i) => {
						prepareRow(row);
						return (
							<tr
								onClick={() => {
									handleView(row);
								}}
								{...row.getRowProps()}
							>
								{row.cells.map((cell) => {
									return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="d-flex mt-1">
				<div className="m-4">
					<Button variant="outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{"<<"}
					</Button>{" "}
					<Button
						variant="outline-primary"
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
					>
						{"<"}
					</Button>{" "}
					<Button variant="outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
						{">"}
					</Button>{" "}
					<Button
						variant="outline-primary"
						onClick={() => gotoPage(pageCount - 1)}
						disabled={!canNextPage}
					>
						{">>"}
					</Button>{" "}
				</div>
				<Form.Select
					size="md"
					style={{ width: "150px" }}
					className="m-4"
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[5, 10, 25, 50, 100].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</Form.Select>
			</div>
		</div>
	);
};

function GlobalFilter({ globalFilter, setGlobalFilter }) {
	const [value, setValue] = useState(globalFilter);

	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 200);

	return (
		<input
			value={value || ""}
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
			placeholder="Search"
			className="mb-3"
		/>
	);
}

export default List;
