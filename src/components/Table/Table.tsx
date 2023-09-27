import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useEffect, useState } from "react";

import type { User } from "../UsersList/UsersList";
import styles from "./Table.module.scss";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Dropdown from "../Dropdown/Dropdown";

interface DataTableProps {
  data: User[];
}

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor((row) => row.name, {
    id: "user",
    cell: (info) => (
      <div className={styles.userInformationBlock}>
        <img
          src={info.row.original.avatar}
          alt="profil picture"
          className={styles.avatar}
        />
        <div>
          <p>{info.getValue()}</p>
          <p className={styles.subInformation}>{info.row.original.email}</p>
        </div>
      </div>
    ),
    header: () => <span>User</span>,
  }),
  columnHelper.accessor((row) => row.groups, {
    id: "teams",
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => <span>Teams</span>,
  }),
  columnHelper.accessor((row) => row.access, {
    id: "access",
    cell: (info) => <p>On {info.getValue().length} products</p>,
    header: () => <span>Access</span>,
  }),
  columnHelper.accessor((row) => row.last_login, {
    id: "last_login",
    cell: (info) => (
      <p>
        {format(new Date(info.getValue() * 1000), "dd/MM/yyyy - HH:mm", {
          locale: fr,
        })}
      </p>
    ),
    header: () => <span>Last Login</span>,
  }),
];

const Table = ({ data }: DataTableProps) => {
  if (!data) return null;

  const [groupSelected, setGroupSelected] = useState<string>("");
  const [dataFiltered, setDataFiltered] = useState<User[]>(data);

  useEffect(() => {
    const newDataFiltered =
      groupSelected !== "Teams"
        ? data.filter((user) => user.groups.includes(groupSelected))
        : data;

    setDataFiltered(newDataFiltered);
  });

  const table = useReactTable({
    data: dataFiltered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const groupsOptions = () => {
    const tabOptions = data.reduce<string[]>(
      (acc, item) => [...acc, ...item.groups],
      []
    );

    tabOptions.unshift("Teams");

    return tabOptions.filter(
      (item, index) => tabOptions.indexOf(item) === index
    );
  };

  const handleGroupChange = (newOption: string) => setGroupSelected(newOption);

  return (
    <>
      <Dropdown options={groupsOptions()} onChange={handleGroupChange} />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
