import { fetchData } from "@/api";
import React, { useEffect, useState } from "react";

import Table from "../Table/Table";
import styles from "./UsersList.module.scss";

export interface User {
  access: Array<string>;
  avatar: string;
  createdAt: Date;
  email: string;
  groups: Array<string>;
  id: string;
  last_login: number;
  name: string;
}

const UserList = () => {
  const [usersData, setUsersData] = useState<User[] | null>(null);

  useEffect(() => {
    fetchData().then((result) => {
      setUsersData(result);
    });
  }, []);

  if (!usersData) return null;

  return (
    <div className={styles.container}>
      <p className={styles.usersTitle}>{`Users (${usersData.length})`}</p>
      <Table data={usersData} />
    </div>
  );
};

export default UserList;
