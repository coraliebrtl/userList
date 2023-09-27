"use client";

import { fetchData } from "../api";
import React, { createContext, useEffect, useState } from "react";
import UsersList from "../components/UsersList/UsersList";
import Header from "@/components/Header/Header";

const AppStateContext = createContext(undefined);

export default function Home() {
  return (
    <>
      <Header />
      <UsersList />
    </>
  );
}
